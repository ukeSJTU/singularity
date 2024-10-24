import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt?: string;
  coverImageURL?: string;
  readingTime: number;
  slug: string;
  views: number;
  likes: number;
}

export function ArticleCard({
  id,
  title,
  excerpt,
  coverImageURL,
  readingTime,
  slug,
  views,
  likes,
}: ArticleCardProps) {
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
            {excerpt && (
              <p className="text-sm text-muted-foreground">{excerpt}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {readingTime} min read
          </span>
          <span className="text-sm text-muted-foreground">{views} views</span>
          <span className="text-sm text-muted-foreground">{likes} likes</span>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/articles/${slug}`}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
