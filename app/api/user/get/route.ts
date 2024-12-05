import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await prisma.user.findMany({ include: { profile: true } });
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
