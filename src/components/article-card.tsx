import { BaseCard } from "@/components/base-card";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  readingTime: number;
  views: number;
  likes: number;
  tags: { id: string; name: string }[];
  isPinned?: boolean;
  slug: string;
}

export function ArticleCard({
  id,
  title,
  excerpt,
  coverImage,
  readingTime,
  views,
  likes,
  tags,
  isPinned,
  slug,
}: ArticleCardProps) {
  return (
    <BaseCard
      coverImage={coverImage}
      title={title}
      description={excerpt}
      tags={tags}
      metadata={
        <div className="flex gap-4">
          <span>{readingTime} min read</span>
          <span>{views} views</span>
          <span>{likes} likes</span>
        </div>
      }
      isPinned={isPinned}
      linkHref={`/articles/${slug}`}
    />
  );
}
