import Link from "next/link";

interface RelatedArticle {
  title: string;
  slug: string;
  order: number;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="text-primary hover:underline"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
