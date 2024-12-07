import { PostSchema } from "@/utils/zodSchema"
import { getSession } from "@/utils/cookie"
import { NextResponse } from "next/server"
import prisma from "@/utils/db"
import { z } from "zod"

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { title, content, imageUrl } = PostSchema.parse(body);
        if (!title || !content ) return NextResponse.json({ message: "All fields are required" }, { status: 400 });

        const session = await getSession();
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
        const { id: userId } = session;
        const post = await prisma.post.create({ data: { title, content, imageUrl, userId } });

        return NextResponse.json({ post }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
        return NextResponse.json({ message: "Failed to create post" }, { status: 500 })
    }
}
