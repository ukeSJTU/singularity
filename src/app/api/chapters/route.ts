import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const tag = searchParams.get("tag");
    const published = searchParams.get("published");
    const sort = searchParams.get("sort") ?? "createdAt";
    const order = searchParams.get("order") ?? "desc";

    const where: any = {};
    if (tag) {
      where.Tag = { name: tag };
    }
    if (published !== null) {
      where.published = published === "true";
    }

    const series = await prisma.series.findMany({
      where,
      include: {
        chapters: {
          include: {
            articles: {
              select: {
                id: true,
                title: true,
                published: true,
              },
            },
          },
        },
        articles: {
          where: { chapterId: null }, // 只获取直接属于系列的文章
          select: {
            id: true,
            title: true,
            published: true,
          },
        },
        Tag: true,
      },
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.series.count({ where });

    return NextResponse.json({
      series,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching series:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const series = await prisma.series.create({
      data: {
        title: data.title,
        description: data.description,
        slug: data.slug,
        coverImageURL: data.coverImageURL,
        tagId: data.tagId,
      },
      include: {
        Tag: true,
      },
    });

    return NextResponse.json({ series });
  } catch (error) {
    console.error("Error creating series:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
