"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaGrid } from "@/components/admin/media-grid";
import { listMedia, uploadMedia, deleteMedia } from "@/lib/queries/media";
import { useAuth } from "@/hooks/use-auth";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type Media = Database["public"]["Tables"]["media"]["Row"];

export default function MediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const loadMedia = useCallback(async () => {
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
    loadMedia();
  }, [loadMedia]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const media = await uploadMedia(file, user?.id);
        setItems((prev) => [media, ...prev]);
      }
      toast.success(`${files.length} arquivo(s) enviado(s)!`);
    } catch {
      toast.error("Erro no upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(media: Media) {
    if (!confirm(`Excluir "${media.filename}"?`)) return;

    try {
      await deleteMedia(media.id, media.storage_path);
      setItems((prev) => prev.filter((m) => m.id !== media.id));
      toast.success("Mídia excluída.");
    } catch {
      toast.error("Erro ao excluir mídia.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Biblioteca de Mídia
        </h1>
        <Button disabled={uploading} onClick={() => document.getElementById("media-upload")?.click()}>
          <Upload className="h-4 w-4" />
          {uploading ? "Enviando..." : "Upload"}
        </Button>
        <input
          id="media-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <MediaGrid items={items} onDelete={handleDelete} />
      )}
    </div>
  );
}
