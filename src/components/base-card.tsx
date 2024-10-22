import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, ChevronUp, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TagBadge } from "@/components/tag-badge";

interface BaseCardProps {
  coverImage?: string;
  title: string;
  description?: string;
  tags?: { id: string; name: string }[];
  metadata?: React.ReactNode;
  isPinned?: boolean;
  linkHref: string;
  onUnfold?: () => void;
  isUnfoldable?: boolean;
  isUnfolded?: boolean;
  children?: React.ReactNode;
}

export function BaseCard({
  coverImage,
  title,
  description,
  tags,
  metadata,
  isPinned,
  linkHref,
  onUnfold,
  isUnfoldable,
  isUnfolded,
  children,
}: BaseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        {coverImage && (
          <div className="w-1/4 min-h-[150px] relative">
            <Image
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {isPinned && <Pin className="h-4 w-4 text-primary" />}
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <TagBadge key={tag.id} name={tag.name} />
              ))}
            </div>
          )}
          {metadata && (
            <div className="mt-2 text-sm text-muted-foreground">{metadata}</div>
          )}
        </div>
      </div>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="ghost" asChild>
          <Link href={linkHref}>
            Read more <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        {isUnfoldable && (
          <Button variant="outline" onClick={onUnfold}>
            {isUnfolded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardFooter>
      {isUnfolded && children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
