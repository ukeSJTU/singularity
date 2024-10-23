import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  name: string;
}

interface ArticleTagsProps {
  tags: Tag[];
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="secondary">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}
