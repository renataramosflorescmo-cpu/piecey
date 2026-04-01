"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleById } from "@/lib/queries/articles";
import { toast } from "sonner";

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(id)
      .then(setArticle)
      .catch(() => toast.error("Erro ao carregar artigo."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!article) {
    return <p className="text-zinc-400">Artigo não encontrado.</p>;
  }

  return <ArticleForm article={article as never} />;
}
