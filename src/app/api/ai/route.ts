import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash-lite";

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "API key não configurada" },
      { status: 500 }
    );
  }

  try {
    const { action, prompt, content } = await request.json();

    let fullPrompt = "";

    if (action === "generate") {
      fullPrompt = `Você é um especialista em marketing de conteúdo para a PIECEY, uma plataforma de tecnologia e marketing para profissionais da saúde, direito e estética.

Gere um artigo de blog otimizado para SEO com as seguintes regras:
- Linguagem empática, descomplicada e focada em resultados
- Tom profissional mas acessível, sem jargões técnicos desnecessários
- Estruture com H2 e H3 para hierarquia clara
- Use negrito para termos importantes
- Inclua um CTA da PIECEY no final
- O artigo deve ter entre 800-1500 palavras
- Use português brasileiro com acentuação correta

IMPORTANTE: Retorne APENAS um JSON válido (sem markdown, sem backticks) com esta estrutura exata:
{"title":"...","slug":"...","excerpt":"...","content_html":"...","seo_title":"...","seo_description":"...","seo_keywords":["...","...."]}

O slug deve ser em minúsculo, sem acentos, separado por hífens.
O content_html deve ser HTML válido com tags <p>, <h2>, <h3>, <strong>, <ul>, <li>.

Tema: ${prompt}`;
    } else if (action === "assist") {
      fullPrompt = `Você é um assistente de escrita da PIECEY. Ajude a melhorar, expandir ou reescrever textos para o blog.

Regras:
- Mantenha o tom empático, descomplicado e focado em resultados
- Use português brasileiro com acentuação correta
- Retorne APENAS o conteúdo HTML melhorado (tags <p>, <h2>, <h3>, <strong>, <ul>, <li>)
- Não adicione explicações, retorne apenas o HTML

Instrução: ${prompt}

Texto atual:
${content}`;
    } else {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "Erro na API do Gemini. Tente novamente em alguns segundos." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (action === "generate") {
      // Parse JSON from response (remove markdown backticks if present)
      const cleanText = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const article = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ article });
        } catch {
          return NextResponse.json({
            article: { title: "Artigo gerado", content_html: text, slug: "artigo-gerado", excerpt: "", seo_title: "", seo_description: "", seo_keywords: [] },
          });
        }
      }
      return NextResponse.json({
        article: { title: "Artigo gerado", content_html: text, slug: "artigo-gerado", excerpt: "", seo_title: "", seo_description: "", seo_keywords: [] },
      });
    }

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
