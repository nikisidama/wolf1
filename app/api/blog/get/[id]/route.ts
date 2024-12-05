import { NextResponse } from "next/server"
import prisma from "@/utils/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
