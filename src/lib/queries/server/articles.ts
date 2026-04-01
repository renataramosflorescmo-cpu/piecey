import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { Database } from "@/types/database";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export async function listPublishedArticlesServer() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, featured_image, author_name, published_at, article_categories(categories(id, name, slug))"
    )
    .eq("status", "published" as const)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data as (Pick<Article, "id" | "title" | "slug" | "excerpt" | "featured_image" | "author_name" | "published_at"> & {
    article_categories: { categories: { id: string; name: string; slug: string } | null }[];
  })[];
}

export async function getArticleBySlugServer(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "*, article_categories(categories(id, name, slug))"
    )
    .eq("slug", slug)
    .eq("status", "published" as const)
    .single();

  if (error) return null;
  return data as Article & {
    article_categories: { categories: { id: string; name: string; slug: string } | null }[];
  };
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
