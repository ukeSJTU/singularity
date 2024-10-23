import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const tag = await prisma.tag.findUnique({
      where: { name: params.name },
      include: {
        articles: true,
        series: true,
      },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}
