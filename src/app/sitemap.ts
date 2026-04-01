import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { listPublishedSlugsServer } from "@/lib/queries/server/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const articles = await listPublishedSlugsServer();
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
