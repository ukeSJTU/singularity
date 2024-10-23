import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleNavigationProps {
  prevArticle?: { title: string; slug: string };
  nextArticle?: { title: string; slug: string };
  seriesTitle?: string;
  seriesId?: string;
  chapterTitle?: string;
  chapterId?: string;
}

export function ArticleNavigation({
  prevArticle,
  nextArticle,
  seriesTitle,
  seriesId,
  chapterTitle,
  chapterId,
}: ArticleNavigationProps) {
  return (
    <nav className="mt-8 flex flex-col space-y-4">
      <div className="flex justify-between">
        {prevArticle && (
          <Button variant="outline" asChild>
            <Link href={`/articles/${prevArticle.slug}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {prevArticle.title}
            </Link>
          </Button>
        )}
        {nextArticle && (
          <Button variant="outline" asChild>
            <Link href={`/articles/${nextArticle.slug}`}>
              {nextArticle.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      {(seriesTitle || chapterTitle) && (
        <div className="text-sm text-muted-foreground">
          {seriesTitle && (
            <Link href={`/series/${seriesId}`} className="hover:underline">
              Series: {seriesTitle}
            </Link>
          )}
          {seriesTitle && chapterTitle && " | "}
          {chapterTitle && (
            <Link href={`/chapters/${chapterId}`} className="hover:underline">
              Chapter: {chapterTitle}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
