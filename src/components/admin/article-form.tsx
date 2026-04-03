"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { SeoFields } from "@/components/admin/seo-fields";
import { MediaPicker } from "@/components/admin/media-picker";
import { AiAssistant } from "@/components/admin/ai-assistant";
import { slugify } from "@/lib/utils/slugify";
import {
  createArticle,
  updateArticle,
  setArticleCategories,
} from "@/lib/queries/articles";
import { listCategories } from "@/lib/queries/categories";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Save, ArrowLeft } from "lucide-react";
import type { Database } from "@/types/database";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface ArticleFormProps {
  article?: Article & {
    article_categories?: { category_id: string; categories: Category | null }[];
  };
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isEditing = !!article;

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [content, setContent] = useState<unknown>(article?.content ?? {});
  const [contentHtml, setContentHtml] = useState(article?.content_html ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [featuredImage, setFeaturedImage] = useState<string | null>(
    article?.featured_image ?? null
  );
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [authorName, setAuthorName] = useState(article?.author_name ?? "");
  const [publishDate, setPublishDate] = useState(
    article?.published_at
      ? new Date(article.published_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [isFeatured, setIsFeatured] = useState(
    article?.seo_keywords?.includes("destaque") ?? false
  );

  // SEO
  const [seoTitle, setSeoTitle] = useState(article?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    article?.seo_description ?? ""
  );
  const [seoKeywords, setSeoKeywords] = useState(
    article?.seo_keywords?.join(", ") ?? ""
  );
  const [ogImage, setOgImage] = useState(article?.og_image ?? "");

  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    article?.article_categories?.map((ac) => ac.category_id) ?? []
  );

  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  useEffect(() => {
    listCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (autoSlug && title) {
      setSlug(slugify(title));
    }
  }, [title, autoSlug]);

  async function handleSave(publishNow = false) {
    if (!title.trim()) {
      toast.error("Título é obrigatório.");
      return;
    }

    setSaving(true);
    const articleData = {
      title,
      slug: slug || slugify(title),
      content: content as import("@/types/database").Json,
      content_html: contentHtml,
      excerpt: excerpt || null,
      featured_image: featuredImage,
      author_name: authorName,
      author_id: user?.id ?? null,
      status: (publishNow ? "published" : status) as "draft" | "published" | "archived",
      published_at: publishNow
        ? new Date(publishDate).toISOString()
        : article?.published_at ?? null,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      seo_keywords: seoKeywords
        ? seoKeywords.split(",").map((k) => k.trim())
        : null,
      og_image: ogImage || null,
    };

    try {
      let articleId: string;

      if (isEditing) {
        await updateArticle(article.id, articleData);
        articleId = article.id;
        toast.success("Artigo atualizado!");
      } else {
        const newArticle = await createArticle(articleData);
        articleId = newArticle.id;
        toast.success("Artigo criado!");
      }

      await setArticleCategories(articleId, selectedCategories);

      // Trigger revalidation
      fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "/blog",
          secret: "revalidate-secret-2026",
        }),
      }).catch(() => {});

      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      toast.error("Erro ao salvar artigo.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function toggleCategory(categoryId: string) {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/articles")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {isEditing ? "Editar Artigo" : "Novo Artigo"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Salvando..." : "Salvar Rascunho"}
          </Button>
          <Button onClick={() => handleSave(true)} disabled={saving}>
            {status === "published" ? "Atualizar" : "Publicar"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <Input
                id="title"
                label="Título"
                placeholder="Título do artigo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    id="slug"
                    label="Slug"
                    placeholder="url-do-artigo"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setAutoSlug(false);
                    }}
                  />
                </div>
                {!autoSlug && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAutoSlug(true);
                      setSlug(slugify(title));
                    }}
                  >
                    Auto
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Conteúdo
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <RichTextEditor
                content={content}
                onChange={(json, html) => {
                  setContent(json);
                  setContentHtml(html);
                }}
              />
              <AiAssistant
                currentContent={contentHtml}
                onApply={(html) => {
                  setContentHtml(html);
                  setContent({ type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Conteúdo atualizado pela IA. Recarregue o editor." }] }] });
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Resumo / Excerpt
                </label>
                <textarea
                  placeholder="Breve resumo do artigo..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="flex w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
            </CardContent>
          </Card>

          <SeoFields
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            seoKeywords={seoKeywords}
            ogImage={ogImage}
            onSeoTitleChange={setSeoTitle}
            onSeoDescriptionChange={setSeoDescription}
            onSeoKeywordsChange={setSeoKeywords}
            onOgImageChange={setOgImage}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Status
              </h2>
            </CardHeader>
            <CardContent>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published" | "archived")}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Data de Publicação
              </h2>
            </CardHeader>
            <CardContent>
              <input
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Destaque
              </h2>
            </CardHeader>
            <CardContent>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    isFeatured ? "bg-electric" : "bg-zinc-300"
                  }`}
                  onClick={() => setIsFeatured(!isFeatured)}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      isFeatured ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {isFeatured ? "Artigo em destaque" : "Artigo normal"}
                </span>
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Categoria (Solução)
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                value={selectedCategories[0] ?? ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedCategories([e.target.value]);
                  } else {
                    setSelectedCategories([]);
                  }
                }}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="">Selecione uma categoria</option>
                <optgroup label="Soluções PIECEY">
                  <option value="__setup">PIECEY Setup</option>
                  <option value="__agenda">PIECEY Agenda</option>
                  <option value="__marketing">PIECEY Marketing</option>
                  <option value="__retencao">PIECEY Retenção</option>
                  <option value="__insights">PIECEY Insights</option>
                  <option value="__members">PIECEY Members</option>
                </optgroup>
                {categories.length > 0 && (
                  <optgroup label="Categorias personalizadas">
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Autor
              </h2>
            </CardHeader>
            <CardContent>
              <Input
                id="author"
                placeholder="Nome do autor"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Imagem Destaque
              </h2>
            </CardHeader>
            <CardContent>
              <MediaPicker
                value={featuredImage}
                onChange={setFeaturedImage}
                label=""
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
