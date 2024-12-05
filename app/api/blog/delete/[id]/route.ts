import { getSession } from "@/utils/cookie"
import { NextResponse } from "next/server"
import prisma from "@/utils/db"
import { z } from "zod";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });

    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id: userId, role: role } = session;

    const post = await prisma.post.findUnique({ where: { id }, select: { userId: true } });

    if (!post) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    if (userId === post.userId || role === "ADMIN") {
      await prisma.post.delete({ where: { id } });
      return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
