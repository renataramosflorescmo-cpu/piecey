"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface SeoFieldsProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
  onSeoTitleChange: (v: string) => void;
  onSeoDescriptionChange: (v: string) => void;
  onSeoKeywordsChange: (v: string) => void;
  onOgImageChange: (v: string) => void;
}

export function SeoFields({
  seoTitle,
  seoDescription,
  seoKeywords,
  ogImage,
  onSeoTitleChange,
  onSeoDescriptionChange,
  onSeoKeywordsChange,
  onOgImageChange,
}: SeoFieldsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        <span className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          SEO & Meta Tags
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {open && (
        <div className="space-y-4 border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <Input
            id="seo-title"
            label="SEO Title"
            placeholder="Título para buscadores (max 60 caracteres)"
            value={seoTitle}
            onChange={(e) => onSeoTitleChange(e.target.value)}
            maxLength={70}
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              SEO Description
            </label>
            <textarea
              placeholder="Descrição para buscadores (max 160 caracteres)"
              value={seoDescription}
              onChange={(e) => onSeoDescriptionChange(e.target.value)}
              maxLength={170}
              rows={3}
              className="flex w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
            <p className="text-xs text-zinc-400">
              {seoDescription.length}/160 caracteres
            </p>
          </div>
          <Input
            id="seo-keywords"
            label="Keywords"
            placeholder="palavra1, palavra2, palavra3"
            value={seoKeywords}
            onChange={(e) => onSeoKeywordsChange(e.target.value)}
          />
          <Input
            id="og-image"
            label="OG Image URL"
            placeholder="URL da imagem para redes sociais"
            value={ogImage}
            onChange={(e) => onOgImageChange(e.target.value)}
          />

          {/* Preview */}
          {(seoTitle || seoDescription) && (
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-xs text-zinc-400">Preview no Google:</p>
              <p className="mt-1 text-sm font-medium text-blue-700">
                {seoTitle || "Título da página"}
              </p>
              <p className="text-xs text-green-700">
                piecey.com/blog/seu-artigo
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {seoDescription || "Descrição da página..."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
