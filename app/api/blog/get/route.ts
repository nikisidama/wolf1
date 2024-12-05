import { NextResponse } from "next/server"
import prisma from "@/utils/db"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            profile: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
