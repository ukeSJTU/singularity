"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ArticleCard } from "@/components/article/article-card";
import { ChapterCard } from "@/components/chapter/chapter-card";
import Link from "next/link";
import Image from "next/image";

interface SeriesCardProps {
  id: string;
  title: string;
  description?: string;
  coverImageURL?: string;
  slug: string;
  views: number;
  likes: number;
  chapters: Array<{
    id: string;
    title: string;
    description?: string;
    slug: string;
    articles: Array<React.ComponentProps<typeof ArticleCard>>;
  }>;
  articles: Array<React.ComponentProps<typeof ArticleCard>>;
}

export function SeriesCard({
  id,
  title,
  description,
  coverImageURL,
  slug,
  views,
  likes,
  chapters,
  articles,
}: SeriesCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          {coverImageURL && (
            <Image
              src={coverImageURL}
              alt={title}
              width={64}
              height={64}
              className="object-cover rounded"
            />
          )}
          <div>
            <CardTitle>{title}</CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">{views} views</span>
          <span className="text-sm text-muted-foreground">{likes} likes</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {chapters.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Chapters</h3>
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.id} {...chapter} />
              ))}
            </div>
          )}
          {articles.length > 0 && (
            <div className="space-y-4 mt-4">
              <h3 className="font-semibold">Articles</h3>
              {articles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          )}
        </CardContent>
      )}
      <CardContent className="pt-0">
        <Button asChild variant="link" className="p-0">
          <Link href={`/series/${slug}`}>View Series</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
