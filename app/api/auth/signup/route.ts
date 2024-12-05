"use server";

import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { SignUpSchema } from "@/utils/zodSchema";
import { NextResponse } from "next/server";
import { loginUser } from "@/utils/cookie";

export async function POST(request: Request) {
  const body = await request.json();
  const parsedData = SignUpSchema.parse(body);

  if (!parsedData.email || !parsedData.password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

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
  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            name: email.split("@")[0],
            bio: "Hello world"
          },
        }
      },
      include: {
        profile: true
      }
    });

    const user = await prisma.user.findUnique({
      where: { email }
    });

    const session = await loginUser(user);

    const response = NextResponse.json(
      {
        success: true,
        session: session
      },
      { status: 201 }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "An unknown error occurred" } },
      { status: 500 }
    );
  }
}
