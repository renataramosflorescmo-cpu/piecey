"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { MediaPicker } from "@/components/admin/media-picker";
import { Save, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { upsertPageSection } from "@/lib/queries/pages";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import type { Database } from "@/types/database";

type PageSection = Database["public"]["Tables"]["page_sections"]["Row"];

export interface SectionField {
  key: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "image" | "video" | "url";
}

export interface SectionConfig {
  sectionKey: string;
  title: string;
  fields: readonly SectionField[];
}

interface PageSectionEditorProps {
  pageKey: string;
  config: SectionConfig;
  initialData?: PageSection | null;
}

export function PageSectionEditor({
  pageKey,
  config,
  initialData,
}: PageSectionEditorProps) {
  const existingContent = (initialData?.content ?? {}) as Record<string, string>;
  const [content, setContent] = useState<Record<string, string>>(existingContent);
  const [isVisible, setIsVisible] = useState(initialData?.is_visible ?? true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  function updateField(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await upsertPageSection(
        pageKey,
        config.sectionKey,
        content,
        initialData?.sort_order ?? 0
      );
      toast.success(`Seção "${config.title}" salva!`);
    } catch {
      toast.error("Erro ao salvar seção.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-sm font-semibold text-navy">
              {config.title}
            </h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                isVisible
                  ? "bg-green-100 text-green-700"
                  : "bg-zinc-100 text-zinc-500"
              )}
            >
              {isVisible ? "Visível" : "Oculta"}
            </span>
          </div>
          {open ? (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          )}
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-5 border-t border-zinc-200 pt-5">
          {config.fields.map((field) => (
            <div key={field.key}>
              {field.type === "text" && (
                <Input
                  id={`${config.sectionKey}-${field.key}`}
                  label={field.label}
                  value={content[field.key] ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}

              {field.type === "textarea" && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    {field.label}
                  </label>
                  <textarea
                    value={content[field.key] ?? ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    rows={4}
                    className="flex w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              )}

              {field.type === "richtext" && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700">
                    {field.label}
                  </label>
                  <RichTextEditor
                    content={
                      content[field.key]
                        ? (() => {
                            try {
                              return JSON.parse(content[field.key]);
                            } catch {
                              return { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: content[field.key] }] }] };
                            }
                          })()
                        : {}
                    }
                    onChange={(json, html) => {
                      updateField(field.key, JSON.stringify(json));
                      updateField(`${field.key}_html`, html);
                    }}
                  />
                </div>
              )}

              {field.type === "image" && (
                <MediaPicker
                  label={field.label}
                  value={content[field.key] ?? null}
                  onChange={(url) => updateField(field.key, url ?? "")}
                />
              )}

              {field.type === "video" && (
                <Input
                  id={`${config.sectionKey}-${field.key}`}
                  label={field.label}
                  placeholder="https://youtube.com/embed/... ou URL do vídeo"
                  value={content[field.key] ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}

              {field.type === "url" && (
                <Input
                  id={`${config.sectionKey}-${field.key}`}
                  label={field.label}
                  placeholder="https://..."
                  value={content[field.key] ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Ocultar seção
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Mostrar seção
                </>
              )}
            </Button>
            <Button onClick={handleSave} disabled={saving} size="sm">
              <Save className="h-4 w-4" />
              {saving ? "Salvando..." : "Salvar seção"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
