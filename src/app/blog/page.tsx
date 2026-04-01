import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleCard } from "@/components/blog/article-card";
import { listPublishedArticlesServer } from "@/lib/queries/server/articles";
import { getPageSeoServer } from "@/lib/queries/server/pages";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoServer("blog");
  return {
    title: seo?.title || "Blog",
    description: seo?.description || "Artigos, novidades e insights do nosso time.",
    alternates: { canonical: `${SITE_URL}/blog` },
  };
}

export const revalidate = 3600; // ISR: revalida a cada 1 hora

export default async function BlogPage() {
  const articles = await listPublishedArticlesServer();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${a.slug}`,
        name: a.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-zinc-50 to-white px-4 py-20 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Blog
            </h1>
            <p className="mt-4 text-lg text-zinc-500">
              Artigos, novidades e insights do nosso time.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            {articles.length === 0 ? (
              <p className="text-center text-zinc-400">
                Nenhum artigo publicado ainda. Volte em breve!
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => {
                  const categories =
                    article.article_categories
                      ?.map((ac: { categories: { id: string; name: string; slug: string } | null }) => ac.categories)
                      .filter(Boolean) as { id: string; name: string; slug: string }[] ?? [];

                  return (
                    <ArticleCard
                      key={article.id}
                      title={article.title}
                      slug={article.slug}
                      excerpt={article.excerpt}
                      featuredImage={article.featured_image}
                      authorName={article.author_name}
                      publishedAt={article.published_at}
                      categories={categories}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
