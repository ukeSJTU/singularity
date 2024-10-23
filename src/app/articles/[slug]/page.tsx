import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/article/article-header";
import { ArticleContent } from "@/components/article/article-content";
import { ArticleTags } from "@/components/article/article-tags";
import { ArticleNavigation } from "@/components/article/article-navigation";
import { ArticleMeta } from "@/components/article/article-meta";
import prisma from "@/lib/prisma";

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      chapter: {
        include: {
          series: true,
        },
      },
      series: true,
      tags: true,
    },
  });

  return article;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      images: article.coverImageURL ? [article.coverImageURL] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="container max-w-5xl py-6 lg:py-10">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <ArticleHeader article={article} />
        <div className="mt-8">
          <ArticleTags article={article} />
        </div>
        <div className="mt-8">
          <ArticleContent article={article} />
        </div>
        <div className="mt-8">
          <ArticleMeta article={article} />
        </div>
        <div className="mt-8">
          <ArticleNavigation article={article} />
        </div>
      </article>
    </main>
  );
}
