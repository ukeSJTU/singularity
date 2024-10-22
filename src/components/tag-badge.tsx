import { Badge, BadgeProps } from "@/components/ui/badge";

interface TagBadgeProps extends BadgeProps {
  name: string;
}

export function TagBadge({ name, ...props }: TagBadgeProps) {
  return (
    <Badge variant="secondary" {...props}>
      {name}
    </Badge>
  );
}
