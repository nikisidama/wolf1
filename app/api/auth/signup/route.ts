"use server";

import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { SignUpSchema } from "@/utils/zodSchema";
import { NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = SignUpSchema.parse(body);
    const { email, password } = parsedData;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with a default profile
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            name: email.split("@")[0],
            bio: "Hello world",
          },
        },
      },
      include: {
        profile: true,
      },
    });

    const session = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.profile?.name,
    };

    // Create a JWT
    const jwt = await new SignJWT({
      id: user.id,
      role: user.role,
      name: user.profile?.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secretKey);


    const response = NextResponse.json(
      { success: true, session },
      { status: 201 }
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
