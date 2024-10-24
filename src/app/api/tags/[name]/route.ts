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
        articles: {
          select: {
            id: true,
            title: true,
            published: true,
          },
        },
        series: {
          select: {
            id: true,
            title: true,
            published: true,
          },
        },
        _count: {
          select: {
            articles: true,
            series: true,
          },
        },
      },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ tag });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = await request.json();

    const tag = await prisma.tag.update({
      where: { name: params.name },
      data: { name },
    });

    return NextResponse.json({ tag });
  } catch (error) {
    console.error("Error updating tag:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    await prisma.tag.delete({
      where: { name: params.name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
