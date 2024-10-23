import React from "react";
import { ChapterCard } from "@/components/chapter/chapter-card";
import { ArticleCard } from "@/components/article/article-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getData(slug: string) {
  // Fetch series data from your API here based on the slug
  // For now, we'll use mock data
  return {
    id: "1",
    title: "Web Development Basics",
    description: "Learn the fundamentals of web development",
    coverImageURL: "/placeholder.svg?height=300&width=600",
    slug: "web-dev-basics",
    views: 1000,
    likes: 50,
    chapters: [
      {
        id: "1",
        title: "HTML Fundamentals",
        description: "Learn the basics of HTML",
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
        ],
      },
      {
        id: "2",
        title: "CSS Basics",
        description: "Learn the fundamentals of CSS",
        slug: "css-basics",
        order: 2,
        articles: [
          {
            id: "3",
            title: "Introduction to CSS",
            excerpt: "Get started with CSS",
            readingTime: 6,
            slug: "intro-to-css",
            views: 450,
            likes: 22,
          },
        ],
      },
    ],
    articles: [
      {
        id: "4",
        title: "Web Development Overview",
        excerpt: "An overview of web development",
        readingTime: 10,
        slug: "web-dev-overview",
        views: 800,
        likes: 40,
      },
    ],
    tags: ["HTML", "CSS", "Web Development"],
  };
}

export default async function SeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const series = await getData(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{series.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{series.description}</p>
          {series.coverImageURL && (
            <img
              src={series.coverImageURL}
              alt={series.title}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {series.views} views
              </span>
              <span className="text-sm text-muted-foreground">
                {series.likes} likes
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {series.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
      <div className="space-y-6 mb-8">
        {series.chapters.map((chapter) => (
          <ChapterCard key={chapter.id} {...chapter} />
        ))}
      </div>

      {series.articles.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            Articles in this Series
          </h2>
          <div className="space-y-6">
            {series.articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
