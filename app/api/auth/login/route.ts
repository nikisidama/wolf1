"use server";

import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { LogInSchema } from "@/utils/zodSchema";
import { NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = LogInSchema.parse(body);
    const { email, password } = parsedData;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const session = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.profile.name,
    };

    // Create a JWT
    const jwt = await new SignJWT(session)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secretKey);

    const response = NextResponse.json(
      { success: true, session },
      { status: 200 }
    );

    response.cookies.set("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "An unknown error occurred" } },
      { status: 500 }
    );
  }
}
