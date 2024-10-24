import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: params.slug },
      include: {
        tags: true,
        // 如果文章属于章节，获取章节和系列信息
        chapter: {
          include: {
            series: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        // 如果文章直接属于系列，获取系列信息
        series: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // 增加浏览次数
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 点赞API
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.update({
      where: { slug: params.slug },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ likes: article.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
