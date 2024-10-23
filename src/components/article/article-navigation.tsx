import { Article, Chapter, Series } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ArticleWithRelations = Article & {
  chapter:
    | (Chapter & {
        series: Series;
      })
    | null;
  series: Series | null;
};

interface ArticleNavigationProps {
  article: ArticleWithRelations;
}

export function ArticleNavigation({ article }: ArticleNavigationProps) {
  const seriesPath = article.series ? `/series/${article.series.slug}` : null;

  const chapterPath = article.chapter
    ? `/series/${article.chapter.series.slug}/chapters/${article.chapter.slug}`
    : null;

  return (
    <div className="flex flex-col gap-4">
      {(seriesPath || chapterPath) && (
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href={chapterPath || seriesPath || "#"}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {article.chapter ? "Chapter" : "Series"}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
