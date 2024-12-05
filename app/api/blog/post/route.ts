import { PostSchema } from "@/utils/zodSchema";
import { NextResponse } from "next/server"
import prisma from "@/utils/db"
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { title, content, userId } = PostSchema.parse(body);
        if (!title || !content || !userId) return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        
        const post = await prisma.post.create({ data: { title, content, userId } });

        return NextResponse.json({ post }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
        return NextResponse.json({ message: "Failed to create post" }, { status: 500 })
    }
}
