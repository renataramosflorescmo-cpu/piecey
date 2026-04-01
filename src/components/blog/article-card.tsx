import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils/format-date";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  authorName: string;
  publishedAt: string | null;
  categories?: { id: string; name: string; slug: string }[];
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  featuredImage,
  authorName,
  publishedAt,
  categories = [],
}: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
      <Link href={`/blog/${slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-300">
              <svg
                className="h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100">
            {title}
          </h2>
        </Link>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
          {authorName && <span>{authorName}</span>}
          {authorName && publishedAt && <span>·</span>}
          {publishedAt && (
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          )}
        </div>
      </div>
    </article>
  );
}
