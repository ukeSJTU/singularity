import { CalendarIcon, ClockIcon, EyeIcon, HeartIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ArticleHeaderProps {
  title: string;
  excerpt?: string;
  coverImage?: string;
  createdAt: string;
  readingTime: number;
  views: number;
  likes: number;
}

export function ArticleHeader({
  title,
  excerpt,
  coverImage,
  createdAt,
  readingTime,
  views,
  likes,
}: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {excerpt && (
        <p className="text-xl text-muted-foreground mb-4">{excerpt}</p>
      )}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-auto rounded-lg mb-4"
        />
      )}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDate(createdAt)}
        </div>
        <div className="flex items-center">
          <ClockIcon className="mr-2 h-4 w-4" />
          {readingTime} min read
        </div>
        <div className="flex items-center">
          <EyeIcon className="mr-2 h-4 w-4" />
          {views} views
        </div>
        <div className="flex items-center">
          <HeartIcon className="mr-2 h-4 w-4" />
          {likes} likes
        </div>
      </div>
    </header>
  );
}
