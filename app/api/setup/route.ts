// app/api/profile/setup/route.ts
"use server";

import prisma from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, bio } = body;

    const cookieStore = cookies();
    const session = (await cookieStore).get("session")?.value;

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parsedSession = JSON.parse(session);

    await prisma.profile.update({
      where: { userId: parsedSession.id },
      data: { name, bio },
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unknown error" } },
      { status: 500 }
    );
  }
}
