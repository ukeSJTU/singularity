import React from "react";
import { ArticleCard } from "@/components/article/article-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getData(slug: string) {
  // Fetch chapter data from your API here based on the slug
  // For now, we'll use mock data
  return {
    id: "1",
    title: "HTML Fundamentals",
    description: "Learn the basics of HTML",
    coverImageURL: "/placeholder.svg?height=150&width=150",
    slug: "html-fundamentals",
    order: 1,
    articles: [
      {
        id: "1",
        title: "Introduction to HTML",
        excerpt: "Get started with HTML",
        readingTime: 5,
        slug: "intro-to-html",
        views: 500,
        likes: 20,
      },
      {
        id: "2",
        title: "HTML Tags and Elements",
        excerpt: "Learn about different HTML tags and elements",
        readingTime: 8,
        slug: "html-tags-and-elements",
        views: 400,
        likes: 18,
      },
      // Add more articles as needed
    ],
  };
}

export default async function ChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  const chapter = await getData(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            Chapter {chapter.order}: {chapter.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{chapter.description}</p>
          {chapter.coverImageURL && (
            <img
              src={chapter.coverImageURL}
              alt={chapter.title}
              className="mt-4 w-full h-auto object-cover rounded"
            />
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Articles in this Chapter</h2>
      <div className="space-y-6">
        {chapter.articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
