import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const series = await prisma.series.findUnique({
      where: { slug: params.slug },
      include: {
        chapters: {
          include: {
            articles: {
              include: {
                tags: true,
              },
            },
          },
          orderBy: { order: "asc" },
        },
        articles: {
          where: { chapterId: null },
          include: {
            tags: true,
          },
          orderBy: { order: "asc" },
        },
        Tag: true,
      },
    });

    if (!series) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    // 增加浏览次数
    await prisma.series.update({
      where: { slug: series.slug },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ series });
  } catch (error) {
    console.error("Error fetching series:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json();

    const series = await prisma.series.update({
      where: { slug: params.slug },
      data: {
        title: data.title,
        description: data.description,
        coverImageURL: data.coverImageURL,
        tagId: data.tagId,
        published: data.published,
      },
      include: {
        Tag: true,
      },
    });

    return NextResponse.json({ series });
  } catch (error) {
    console.error("Error updating series:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.series.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting series:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
