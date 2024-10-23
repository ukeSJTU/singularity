import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const series = await prisma.series.findMany({
      include: {
        chapters: true,
        articles: {
          include: {
            tags: true,
          },
        },
        Tag: true,
      },
    });
    return NextResponse.json(series);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch series" },
      { status: 500 }
    );
  }
}
