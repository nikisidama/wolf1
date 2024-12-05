import { getSession } from "@/utils/cookie"
import { NextResponse } from "next/server"
import { PostSchema } from "@/utils/zodSchema";
import prisma from "@/utils/db"
import { z } from "zod";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });

    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id: SuserId, role: role } = session;

    const Bpost = await prisma.post.findUnique({ where: { id }, select: { userId: true } });
    if (!Bpost) return NextResponse.json({ message: "Post not found" }, { status: 404 });

    const body = await request.json();
    const { title, content, userId } = PostSchema.parse(body);

    if (!title || !content || !userId) return NextResponse.json({ message: "All fields are required" }, { status: 400 });

    if (SuserId === userId || role === "ADMIN") {
      const post = await prisma.post.update({ where: { id: Number(params.id) }, data: { title, content, userId } });
      return NextResponse.json({ post }, { status: 201 })
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}
