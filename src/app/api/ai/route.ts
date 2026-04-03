import { NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: Request) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "API key não configurada" },
      { status: 500 }
    );
  }

  try {
    const { action, prompt, content } = await request.json();

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "generate") {
      systemPrompt = `Você é um especialista em marketing de conteúdo para a PIECEY, uma plataforma de tecnologia e marketing para profissionais da saúde, direito e estética.

Gere artigos de blog otimizados para SEO com as seguintes regras:
- Linguagem empática, descomplicada e focada em resultados
- Tom profissional mas acessível, sem jargões técnicos desnecessários
- Estruture com H2 e H3 para hierarquia clara
- Use negrito para termos importantes
- Inclua um CTA da PIECEY no final
- Retorne um JSON válido com: title, slug, excerpt, content_html, seo_title, seo_description, seo_keywords (array)
- O content_html deve ser HTML válido com tags <p>, <h2>, <h3>, <strong>, <ul>, <li>
- O slug deve ser em minúsculo, sem acentos, separado por hífens
- Artigos devem ter entre 800-1500 palavras
- Use português brasileiro com acentuação correta`;

      userPrompt = prompt;
    } else if (action === "assist") {
      systemPrompt = `Você é um assistente de escrita da PIECEY. Ajude a melhorar, expandir ou reescrever textos para o blog da PIECEY.

Regras:
- Mantenha o tom empático, descomplicado e focado em resultados
- Use português brasileiro com acentuação correta
- Retorne apenas o texto melhorado em HTML (tags <p>, <h2>, <h3>, <strong>, <ul>, <li>)
- Não adicione explicações, retorne apenas o conteúdo HTML`;

      userPrompt = `${prompt}\n\nTexto atual:\n${content}`;
    } else {
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json(
        { error: "Erro na API do Claude" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.content[0]?.text || "";

    if (action === "generate") {
      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const article = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ article });
        } catch {
          return NextResponse.json({ article: { content_html: text } });
        }
      }
      return NextResponse.json({ article: { content_html: text } });
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
