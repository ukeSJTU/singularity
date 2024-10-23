import { Article, Chapter, Series } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type ArticleWithRelations = Article & {
  chapter:
    | (Chapter & {
        series: Series;
      })
    | null;
  series: Series | null;
};

interface ArticleMetaProps {
  article: ArticleWithRelations;
}

export function ArticleMeta({ article }: ArticleMetaProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {article.series && (
          <div className="mb-4">
            <div className="text-sm font-medium text-muted-foreground">
              Series
            </div>
            <Link
              href={`/series/${article.series.slug}`}
              className="text-lg font-semibold hover:underline"
            >
              {article.series.title}
            </Link>
          </div>
        )}
        {article.chapter && (
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Chapter
            </div>
            <Link
              href={`/series/${article.chapter.series.slug}/chapters/${article.chapter.slug}`}
              className="text-lg font-semibold hover:underline"
            >
              {article.chapter.title}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
