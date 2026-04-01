import { formatDate } from "@/lib/utils/format-date";

interface ArticleContentProps {
  title: string;
  contentHtml: string;
  authorName: string;
  publishedAt: string | null;
  categories?: { id: string; name: string; slug: string }[];
}

export function ArticleContent({
  title,
  contentHtml,
  authorName,
  publishedAt,
  categories = [],
}: ArticleContentProps) {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        {categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          {title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
          {authorName && (
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {authorName}
            </span>
          )}
          {publishedAt && (
            <>
              <span>·</span>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div
        className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
