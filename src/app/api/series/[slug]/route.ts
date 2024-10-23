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
        },
        articles: {
          include: {
            tags: true,
          },
        },
        Tag: true,
      },
    });

    if (!series) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    return NextResponse.json(series);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch series" },
      { status: 500 }
    );
  }
}
