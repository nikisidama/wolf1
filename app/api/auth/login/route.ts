"use server";

import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { LogInSchema } from "@/utils/zodSchema";
import { NextResponse } from "next/server";
import { loginUser } from "@/utils/cookie";
import { z } from "zod";

export async function POST(request: Request) {

  const body = await request.json();
  const parsedData = LogInSchema.parse(body);
  if (!parsedData.email || !parsedData.password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const { email, password } = parsedData;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
      // include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const session = await loginUser(user);

    const response = NextResponse.json(
      {
        success: true,
        session: session
      },
      { status: 200 }
    );

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
