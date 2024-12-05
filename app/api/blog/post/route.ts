import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content, userId } = body;

        if (!title || !content || !userId) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                userId,
            },
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: "Failed to create post" },
            { status: 500 }
        );
    }
}
