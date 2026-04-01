import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type MediaInsert = Database["public"]["Tables"]["media"]["Insert"];

export async function listMedia() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function uploadMedia(file: File, userId?: string) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const storagePath = `uploads/${fileName}`;

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(storagePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(storagePath);

  // Get image dimensions if it's an image
  let width: number | null = null;
  let height: number | null = null;

  if (file.type.startsWith("image/")) {
    const dimensions = await getImageDimensions(file);
    width = dimensions.width;
    height = dimensions.height;
  }

  // Insert record
  const mediaRecord: MediaInsert = {
    filename: file.name,
    storage_path: storagePath,
    url: publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
    width,
    height,
    uploaded_by: userId ?? null,
  };

  const { data, error } = await supabase
    .from("media")
    .insert(mediaRecord)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMedia(id: string, storagePath: string) {
  const supabase = createClient();

  // Delete from storage
  await supabase.storage.from("media").remove([storagePath]);

  // Delete record
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw error;
}

export async function updateMediaAlt(id: string, altText: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("media")
    .update({ alt_text: altText })
    .eq("id", id);
  if (error) throw error;
}

function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}
