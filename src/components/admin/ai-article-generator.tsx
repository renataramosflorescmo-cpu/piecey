"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createArticle } from "@/lib/queries/articles";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles, Loader2, Check, FileText } from "lucide-react";
import { toast } from "sonner";

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
}

export function AiArticleGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [article, setArticle] = useState<GeneratedArticle | null>(null);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Digite um tema para o artigo.");
      return;
    }

    setGenerating(true);
    setArticle(null);

    try {
      const prompt = `Gere um artigo completo sobre: "${topic}"${
        keywords ? `\n\nPalavras-chave foco: ${keywords}` : ""
      }\n\nO artigo deve ser relevante para profissionais da saúde, estética, odontologia ou direito que são clientes da PIECEY.`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", prompt }),
      });

      if (!res.ok) throw new Error("Erro na API");

      const data = await res.json();
      if (data.article) {
        setArticle(data.article);
        toast.success("Artigo gerado com sucesso!");
      } else {
        toast.error("Não foi possível gerar o artigo.");
      }
    } catch {
      toast.error("Erro ao gerar artigo. Tente novamente.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSaveAsDraft() {
    if (!article) return;
    setSaving(true);

    try {
      await createArticle({
        title: article.title,
        slug: article.slug,
        content_html: article.content_html,
        content: {},
        excerpt: article.excerpt,
        author_name: "PIECEY",
        author_id: user?.id ?? null,
        status: "draft",
        seo_title: article.seo_title,
        seo_description: article.seo_description,
        seo_keywords: article.seo_keywords,
      });

      toast.success("Artigo salvo como rascunho!");
      router.push("/admin/articles");
    } catch {
      toast.error("Erro ao salvar artigo.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (!article) return;
    setSaving(true);

    try {
      await createArticle({
        title: article.title,
        slug: article.slug,
        content_html: article.content_html,
        content: {},
        excerpt: article.excerpt,
        author_name: "PIECEY",
        author_id: user?.id ?? null,
        status: "published",
        published_at: new Date().toISOString(),
        seo_title: article.seo_title,
        seo_description: article.seo_description,
        seo_keywords: article.seo_keywords,
      });

      toast.success("Artigo publicado!");
      router.push("/admin/articles");
    } catch {
      toast.error("Erro ao publicar artigo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple" />
            <h2 className="font-heading text-lg font-semibold text-zinc-900">
              Gerador de Artigos com IA
            </h2>
          </div>
          <p className="text-sm text-zinc-500">
            Digite um tema e a IA gera um artigo completo otimizado para SEO.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            id="topic"
            label="Tema do artigo"
            placeholder="Ex: Como reduzir no-show em consultórios odontológicos"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
          <Input
            id="keywords"
            label="Palavras-chave (opcional)"
            placeholder="Ex: no-show odontologia, reduzir faltas dentista"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Button
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando artigo...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Gerar Artigo com IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      {article && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-electric" />
                <h2 className="font-heading text-lg font-semibold text-zinc-900">
                  Artigo Gerado
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveAsDraft}
                  disabled={saving}
                >
                  Salvar Rascunho
                </Button>
                <Button
                  size="sm"
                  onClick={handlePublish}
                  disabled={saving}
                >
                  <Check className="h-4 w-4" />
                  Publicar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Meta info */}
            <div className="rounded-lg bg-zinc-50 p-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium text-zinc-700">Título:</span>{" "}
                <span className="text-zinc-900">{article.title}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-zinc-700">Slug:</span>{" "}
                <span className="text-zinc-500">/{article.slug}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-zinc-700">Excerpt:</span>{" "}
                <span className="text-zinc-600">{article.excerpt}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-zinc-700">SEO Keywords:</span>{" "}
                <span className="text-zinc-500">
                  {article.seo_keywords?.join(", ")}
                </span>
              </p>
            </div>

            {/* Content preview */}
            <div
              className="prose prose-zinc max-w-none rounded-lg border border-zinc-200 p-6"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
