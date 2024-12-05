import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      }
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
