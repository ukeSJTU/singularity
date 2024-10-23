"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SeriesCard } from "@/components/series/series-card";
import { ArticleCard } from "@/components/article/article-card";

interface Tag {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  coverImageURL: string | null;
  readingTime: number;
  slug: string;
  publishedAt: string | null;
  views: number;
  likes: number;
  tags: Tag[];
  chapter?: {
    id: string;
    title: string;
  } | null;
  series?: {
    id: string;
    title: string;
  } | null;
}

interface Series {
  id: string;
  title: string;
  description: string | null;
  coverImageURL: string | null;
  slug: string;
  views: number;
  likes: number;
  Tag: Tag | null;
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch articles
        const articlesRes = await fetch("/api/articles");
        if (!articlesRes.ok) throw new Error("Failed to fetch articles");
        const articlesData = await articlesRes.json();
        setArticles(articlesData);

        // Fetch series
        const seriesRes = await fetch("/api/series");
        if (!seriesRes.ok) throw new Error("Failed to fetch series");
        const seriesData = await seriesRes.json();
        setSeries(seriesData);

        // Extract unique tags from articles
        const uniqueTags = Array.from(
          new Set(
            articlesData
              .flatMap((article: Article) => article.tags)
              .filter((tag: Tag) => tag)
          )
        );
        setTags(uniqueTags);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-40 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our Blog</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Series</h2>
        {series.length > 0 ? (
          <div className="space-y-6">
            {series.map((series) => (
              <SeriesCard key={series.id} {...series} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No series available yet.</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
        {articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles available yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Tags</h2>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tags available yet.</p>
        )}
      </section>
    </div>
  );
}
