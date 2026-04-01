"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaGrid } from "@/components/admin/media-grid";
import { listMedia, uploadMedia } from "@/lib/queries/media";
import { useAuth } from "@/hooks/use-auth";
import { ImageIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type Media = Database["public"]["Tables"]["media"]["Row"];

interface MediaPickerProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}

export function MediaPicker({
  value,
  onChange,
  label = "Imagem",
}: MediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listMedia();
      setItems(data);
    } catch {
      toast.error("Erro ao carregar mídia.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) loadMedia();
  }, [open, loadMedia]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const media = await uploadMedia(file, user?.id);
      setItems((prev) => [media, ...prev]);
      toast.success("Upload realizado!");
    } catch {
      toast.error("Erro no upload.");
    } finally {
      setUploading(false);
    }
  }

  function handleSelect(media: Media) {
    onChange(media.url);
    setOpen(false);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Selecionada"
            className="h-32 w-auto rounded-lg border border-zinc-200 object-cover dark:border-zinc-800"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6"
            onClick={() => onChange(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <ImageIcon className="h-4 w-4" />
        {value ? "Trocar imagem" : "Selecionar imagem"}
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-950">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Biblioteca de Mídia
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  disabled={uploading}
                  onClick={() => document.getElementById("picker-upload")?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? "Enviando..." : "Upload"}
                </Button>
                <input
                  id="picker-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : (
              <MediaGrid
                items={items}
                selectable
                selectedUrl={value ?? undefined}
                onSelect={handleSelect}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
