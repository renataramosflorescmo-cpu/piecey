import { createClient } from "@/lib/supabase/client";
import type { Json } from "@/types/database";

export async function getPageSections(pageKey: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_key", pageKey)
    .order("sort_order");

  if (error) throw error;
  return data;
}

export async function updatePageSection(
  id: string,
  content: Json,
  isVisible?: boolean
) {
  const supabase = createClient();
  const update: Record<string, unknown> = { content };
  if (isVisible !== undefined) update.is_visible = isVisible;

  const { error } = await supabase
    .from("page_sections")
    .update(update)
    .eq("id", id);

  if (error) throw error;
}

export async function upsertPageSection(
  pageKey: string,
  sectionKey: string,
  content: Json,
  sortOrder: number = 0
) {
  const supabase = createClient();
  const { error } = await supabase.from("page_sections").upsert(
    {
      page_key: pageKey,
      section_key: sectionKey,
      content,
      sort_order: sortOrder,
    },
    { onConflict: "page_key,section_key" }
  );

  if (error) throw error;
}

export async function getPageSeo(pageKey: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("page_seo")
    .select("*")
    .eq("page_key", pageKey)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function updatePageSeo(
  pageKey: string,
  seo: {
    title?: string;
    description?: string;
    og_image?: string;
    keywords?: string[];
  }
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("page_seo")
    .update(seo)
    .eq("page_key", pageKey);

  if (error) throw error;
}
