import { createStaticClient } from "@/lib/supabase/static";
import type { Database } from "@/types/database";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export async function listPublishedArticlesServer() {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, slug, excerpt, featured_image, author_name, published_at")
      .eq("status", "published" as const)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
    return data as Pick<Article, "id" | "title" | "slug" | "excerpt" | "featured_image" | "author_name" | "published_at">[];
  } catch (e) {
    console.error("Error in listPublishedArticlesServer:", e);
    return [];
  }
}

export async function getArticleBySlugServer(slug: string) {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published" as const)
      .single();

    if (error) return null;
    return data as Article;
  } catch {
    return null;
  }
}

export async function listPublishedSlugsServer() {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published" as const);

  if (error) return [];
  return data as Pick<Article, "slug" | "updated_at">[];
}
