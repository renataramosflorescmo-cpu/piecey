import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];

export async function listArticles(status?: "draft" | "published" | "archived") {
  const supabase = createClient();
  let query = supabase
    .from("articles")
    .select("*, article_categories(category_id, categories(id, name, slug))")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getArticleById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_categories(category_id, categories(id, name, slug))")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getArticleBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_categories(category_id, categories(id, name, slug))")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;
  return data;
}

export async function createArticle(article: ArticleInsert): Promise<Article> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data!;
}

export async function updateArticle(id: string, article: ArticleUpdate) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteArticle(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}

export async function setArticleCategories(
  articleId: string,
  categoryIds: string[]
) {
  const supabase = createClient();

  // Remove existing
  await supabase
    .from("article_categories")
    .delete()
    .eq("article_id", articleId);

  // Insert new
  if (categoryIds.length > 0) {
    const { error } = await supabase.from("article_categories").insert(
      categoryIds.map((categoryId) => ({
        article_id: articleId,
        category_id: categoryId,
      }))
    );
    if (error) throw error;
  }
}

export async function listPublishedArticles() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, featured_image, author_name, published_at, article_categories(categories(id, name, slug))")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}
