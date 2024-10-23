import { Article, Chapter, Series, Tag } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

type ArticleWithRelations = Article & {
  chapter:
    | (Chapter & {
        series: Series;
      })
    | null;
  series: Series | null;
  tags: Tag[];
};

interface ArticleHeaderProps {
  article: ArticleWithRelations;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
      {article.excerpt && (
        <p className="text-xl text-muted-foreground">{article.excerpt}</p>
      )}
      {article.coverImageURL && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={article.coverImageURL}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <time
          dateTime={
            article.publishedAt?.toISOString() ||
            article.createdAt.toISOString()
          }
        >
          {formatDate(
            article.publishedAt?.toISOString() ||
              article.createdAt?.toISOString()
          )}
        </time>
        <div>•</div>
        <div>{article.readingTime} min read</div>
        <div>•</div>
        <div>{article.views} views</div>
        <div>•</div>
        <div>{article.likes} likes</div>
      </div>
    </header>
  );
}
