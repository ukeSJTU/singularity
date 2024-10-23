import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const articles = await prisma.article.findMany({
      include: {
        tags: true,
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
        series: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
