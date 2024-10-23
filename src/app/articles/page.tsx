"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArticleCard } from "@/components/article/article-card";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data.articles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}
