import { Article, Tag } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type ArticleWithTags = Article & {
  tags: Tag[];
};

interface ArticleTagsProps {
  article: ArticleWithTags;
}

export function ArticleTags({ article }: ArticleTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {article.tags.map((tag) => (
        <Link key={tag.id} href={`/tags/${tag.name}`}>
          <Badge variant="secondary">{tag.name}</Badge>
        </Link>
      ))}
    </div>
  );
}
