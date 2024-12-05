import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/cookie";

export async function middleware(request: NextRequest) {
  console.log("Middleware invoked")
  const res = await updateSession(request)
  if (res) return res;
  else return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/blog/new/:path*", "/blog/:id/edit",],
}
