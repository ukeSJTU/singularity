import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const chapters = await prisma.chapter.findMany({
      include: {
        series: true,
        articles: {
          include: {
            tags: true,
          },
        },
      },
    });
    return NextResponse.json(chapters);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 }
    );
  }
}
