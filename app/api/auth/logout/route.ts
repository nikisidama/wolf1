import { logoutUser } from "@/utils/cookie";
import { NextResponse } from "next/server";

export async function POST() {

  await logoutUser();

  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  return response;
}
