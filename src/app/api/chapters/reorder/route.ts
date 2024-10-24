import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const { chapters } = await request.json();

    await prisma.$transaction(
      chapters.map(({ id, order }: { id: string; order: number }) =>
        prisma.chapter.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering chapters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
