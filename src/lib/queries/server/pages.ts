import { createClient } from "@/lib/supabase/server";

export async function getPageSectionsServer(pageKey: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_key", pageKey)
    .eq("is_visible", true)
    .order("sort_order");

  if (error) return [];
  return data;
}

export async function getPageSeoServer(pageKey: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_seo")
    .select("*")
    .eq("page_key", pageKey)
    .single();

  if (error) return null;
  return data;
}
