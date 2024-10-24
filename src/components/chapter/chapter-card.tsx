"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ArticleCard } from "@/components/article/article-card";
import Link from "next/link";
import Image from "next/image";

interface ChapterCardProps {
  id: string;
  title: string;
  description?: string;
  coverImageURL?: string;
  slug: string;
  order: number;
  articles: Array<React.ComponentProps<typeof ArticleCard>>;
}

export function ChapterCard({
  id,
  title,
  description,
  coverImageURL,
  slug,
  order,
  articles,
}: ChapterCardProps) {
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
            <CardTitle>
              Chapter {order}: {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {articles.length} articles
          </span>
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
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </CardContent>
      )}
      <CardContent className="pt-0">
        <Button asChild variant="link" className="p-0">
          <Link href={`/chapters/${slug}`}>View Chapter</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
