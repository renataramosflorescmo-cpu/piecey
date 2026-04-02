import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleContent } from "@/components/blog/article-content";
import {
  getArticleBySlugServer,
  listPublishedSlugsServer,
} from "@/lib/queries/server/articles";
import { SITE_URL } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await listPublishedSlugsServer();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugServer(slug);

  if (!article) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || "",
    keywords: article.seo_keywords ?? undefined,
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || "",
      type: "article",
      publishedTime: article.published_at ?? undefined,
      authors: article.author_name ? [article.author_name] : undefined,
      images: article.og_image || article.featured_image
        ? [article.og_image || article.featured_image!]
        : [],
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  };
}

export const revalidate = 3600;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlugServer(slug);

  if (!article) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt || article.seo_description,
    image: article.featured_image || article.og_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name: article.author_name,
    },
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <Header />
      <main className="flex-1">
        <div className="px-4 py-16">
          <ArticleContent
            title={article.title}
            contentHtml={article.content_html}
            authorName={article.author_name}
            publishedAt={article.published_at}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
