"use server"

import { SignUpSchema } from "@/utils/zodSchema"
import { NextResponse } from "next/server"
import { loginUser } from "@/utils/cookie"
import prisma from "@/utils/db"
import bcrypt from "bcrypt"
import { z } from "zod"

export async function POST(request: Request) {
  const body = await request.json();

  const parsedData = SignUpSchema.parse(body);
  if (!parsedData.email || !parsedData.password) return NextResponse.json({ message: "All fields are required" }, { status: 400 });

  const { email, password } = parsedData;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) return NextResponse.json({ message: "Email already exists" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashed,
        profile: {
          create: {
            name: email.split("@")[0],
            bio: "Hello world!"
          }
        }
      },
      include: {
        profile: true
      }
    });

    const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
    await loginUser(user);

    const response = NextResponse.json({ success: true }, { status: 201 });
    return response
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    return NextResponse.json({ error: { message: error instanceof Error ? error.message : "An unknown error occurred" } }, { status: 500 })
  }
}
