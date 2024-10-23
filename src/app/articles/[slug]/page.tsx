"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArticleHeader } from "@/components/article-header";
import { ArticleContent } from "@/components/article-content";
import { RelatedArticles } from "@/components/related-articles";
import { ArticleTags } from "@/components/article-tags";
import { ArticleNavigation } from "@/components/article-navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Tag {
  id: string;
  name: string;
}

interface Series {
  id: string;
  title: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  readingTime: number;
  views: number;
  likes: number;
  tags: Tag[];
  series: Series | null;
  chapter: null;
  seriesId: string | null;
  chapterId: string | null;
  slug: string;
  published: boolean;
  updatedAt: string;
  order: number;
}

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

interface ApiResponse {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticlePage({ params: { slug } }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get<ApiResponse>(`/api/articles/${slug}`);
        // Access the data directly without .data.data
        setArticle(response.data.article);
        setRelatedArticles(response.data.relatedArticles);
        console.log("Article data:", response.data.article);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading content: {error.message}
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ArticleHeader
        title={article.title}
        excerpt={article.excerpt}
        coverImage={article.coverImage}
        createdAt={article.createdAt}
        readingTime={article.readingTime}
        views={article.views}
        likes={article.likes}
      />
      <ArticleTags tags={article.tags} />
      <ArticleContent content={article.content} />
      <ArticleNavigation
        seriesTitle={article.series?.title}
        seriesId={article.seriesId}
        chapterTitle={null}
        chapterId={article.chapterId}
      />
      <RelatedArticles articles={relatedArticles} />
    </div>
  );
}
