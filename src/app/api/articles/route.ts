import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");
    const seriesId = searchParams.get("seriesId");
    const chapterId = searchParams.get("chapterId");
    const published = searchParams.get("published");
    const sort = searchParams.get("sort") ?? "createdAt";
    const order = searchParams.get("order") ?? "desc";

    // 构建查询条件
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }
    if (tag) {
      where.tags = { some: { name: tag } };
    }
    if (seriesId) {
      where.seriesId = seriesId;
    }
    if (chapterId) {
      where.chapterId = chapterId;
    }
    if (published !== null) {
      where.published = published === "true";
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        tags: true,
        chapter: {
          select: {
            id: true,
            title: true,
            series: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        series: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.article.count({ where });

    return NextResponse.json({
      articles,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        coverImageURL: data.coverImageURL,
        readingTime: data.readingTime,
        slug: data.slug,
        order: data.order,
        ...(data.chapterId ? { chapterId: data.chapterId } : {}),
        ...(data.seriesId ? { seriesId: data.seriesId } : {}),
        tags: {
          connect: data.tagIds?.map((id: string) => ({ id })) ?? [],
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
