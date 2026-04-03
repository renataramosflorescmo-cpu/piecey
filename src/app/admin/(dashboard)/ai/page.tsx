"use client";

import { AiArticleGenerator } from "@/components/admin/ai-article-generator";

export default function AiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Conteúdo com IA
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Gere artigos completos para o blog usando inteligência artificial.
        </p>
      </div>
      <AiArticleGenerator />
    </div>
  );
}
