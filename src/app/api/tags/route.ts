import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");

    const where = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};

    const tags = await prisma.tag.findMany({
      where,
      include: {
        _count: {
          select: {
            articles: true,
            series: true,
          },
        },
      },
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.tag.count({ where });

    return NextResponse.json({
      tags,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const tag = await prisma.tag.create({
      data: { name },
      include: {
        _count: {
          select: {
            articles: true,
            series: true,
          },
        },
      },
    });

    return NextResponse.json({ tag });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
