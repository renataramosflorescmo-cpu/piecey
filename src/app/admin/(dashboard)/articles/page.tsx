"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listArticles, deleteArticle } from "@/lib/queries/articles";
import { formatDateShort } from "@/lib/utils/format-date";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import type { Database } from "@/types/database";

type Article = Database["public"]["Tables"]["articles"]["Row"];

const statusLabels: Record<string, { label: string; class: string }> = {
  draft: { label: "Rascunho", class: "bg-yellow-100 text-yellow-800" },
  published: { label: "Publicado", class: "bg-green-100 text-green-800" },
  archived: { label: "Arquivado", class: "bg-zinc-100 text-zinc-600" },
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const data = await listArticles();
      setArticles(data);
    } catch {
      toast.error("Erro ao carregar artigos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;

    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success("Artigo excluído.");
    } catch {
      toast.error("Erro ao excluir artigo.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Artigos
        </h1>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-400">Nenhum artigo criado ainda.</p>
            <Link href="/admin/articles/new" className="mt-4 inline-block">
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                Criar primeiro artigo
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {articles.map((article) => {
              const statusInfo = statusLabels[article.status];
              return (
                <div
                  key={article.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="truncate font-medium text-zinc-900 hover:text-blue-600 dark:text-zinc-100"
                      >
                        {article.title}
                      </Link>
                      <span
                        className={cn(
                          "flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                          statusInfo.class
                        )}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">
                      /{article.slug}
                      {article.published_at &&
                        ` · ${formatDateShort(article.published_at)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/articles/${article.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
