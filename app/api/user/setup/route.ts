"use server"

import { getSession, loginUser, logoutUser, updateSession } from "@/utils/cookie"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/utils/db"
import { z } from "zod"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, bio } = body;
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 20) return NextResponse.json({ message: "Name is required and must be a valid string." }, { status: 400 });

    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await prisma.profile.update({ where: { userId: session.id }, data: { name, bio } });
    await updateSession(request);
    logoutUser();
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      include: { profile: true }
    });
    await loginUser(user);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    return NextResponse.json({ error: { message: error instanceof Error ? error.message : "Unknown error" } },  { status: 500 }
    );
  }
}
