"use client";

import React, { useState } from "react";
import { BaseCard } from "@/components/base-card";
import { ArticleCard } from "@/components/article-card";

interface SeriesChapterCardProps {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags: { id: string; name: string }[];
  isPinned?: boolean;
  articleCount: number;
  type: "series" | "chapter";
  articles: Array<React.ComponentProps<typeof ArticleCard>>;
}

export function SeriesChapterCard({
  id,
  title,
  description,
  coverImage,
  tags,
  isPinned,
  articleCount,
  type,
  articles,
}: SeriesChapterCardProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);

  return (
    <BaseCard
      coverImage={coverImage}
      title={title}
      description={description}
      tags={tags}
      metadata={`${articleCount} article${articleCount !== 1 ? "s" : ""}`}
      isPinned={isPinned}
      linkHref={`/${type}s/${id}`}
      isUnfoldable={true}
      isUnfolded={isUnfolded}
      onUnfold={() => setIsUnfolded(!isUnfolded)}
    >
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </BaseCard>
  );
}
