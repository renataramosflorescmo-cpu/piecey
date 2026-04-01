"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { Database } from "@/types/database";

type Media = Database["public"]["Tables"]["media"]["Row"];

interface MediaGridProps {
  items: Media[];
  selectable?: boolean;
  selectedUrl?: string;
  onSelect?: (media: Media) => void;
  onDelete?: (media: Media) => void;
}

export function MediaGrid({
  items,
  selectable = false,
  selectedUrl,
  onSelect,
  onDelete,
}: MediaGridProps) {
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-400">
        Nenhuma mídia encontrada.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => {
        const isSelected = selectedUrl === item.url;
        const isImage = item.mime_type.startsWith("image/");

        return (
          <div
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
              isSelected
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
            )}
            onClick={() => selectable && onSelect?.(item)}
          >
            <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900">
              {isImage ? (
                <Image
                  src={item.url}
                  alt={item.alt_text || item.filename}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-400">
                  <span className="text-xs uppercase">
                    {item.mime_type.split("/")[1]}
                  </span>
                </div>
              )}

              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                  <Check className="h-8 w-8 text-blue-600" />
                </div>
              )}
            </div>

            <div className="p-2">
              <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                {item.filename}
              </p>
            </div>

            {onDelete && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
