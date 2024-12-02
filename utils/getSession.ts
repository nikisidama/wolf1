"use server"

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/utils/db";

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, new TextEncoder().encode(process.env.JWT_SECRET));
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name, // Include name from profile
    };
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}

