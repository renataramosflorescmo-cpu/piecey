import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  content: z.unknown().default({}),
  content_html: z.string().default(""),
  excerpt: z.string().optional().nullable(),
  featured_image: z.string().optional().nullable(),
  author_name: z.string().default(""),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  published_at: z.string().optional().nullable(),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
  seo_keywords: z.array(z.string()).optional().nullable(),
  og_image: z.string().optional().nullable(),
  category_ids: z.array(z.string()).default([]),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
