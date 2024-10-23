import React from "react";
import { SeriesCard } from "@/components/series/series-card";

async function getData() {
  // Fetch all series data from your API here
  // For now, we'll use mock data
  return [
    {
      id: "1",
      title: "Web Development Basics",
      description: "Learn the fundamentals of web development",
      coverImageURL: "/placeholder.svg?height=150&width=150",
      slug: "web-dev-basics",
      views: 1000,
      likes: 50,
      chapters: [
        {
          id: "1",
          title: "HTML Fundamentals",
          description: "Learn the basics of HTML",
          slug: "html-fundamentals",
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
          ],
        },
      ],
      articles: [
        {
          id: "2",
          title: "CSS Basics",
          excerpt: "Learn the basics of CSS",
          readingTime: 7,
          slug: "css-basics",
          views: 300,
          likes: 15,
        },
      ],
    },
    // Add more series as needed
  ];
}

export default async function SeriesPage() {
  const series = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Series</h1>
      <div className="space-y-6">
        {series.map((s) => (
          <SeriesCard key={s.id} {...s} />
        ))}
      </div>
    </div>
  );
}
