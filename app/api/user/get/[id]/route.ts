import { NextResponse } from "next/server"
import prisma from "@/utils/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) }, include: { profile: true } });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
