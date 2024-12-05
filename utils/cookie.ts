"use server"

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);
const TIMEOUT = 30 * 24 * 60 * 60;

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${TIMEOUT} sec from now`)
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
    return payload
}

export async function loginUser(userInput: any) {
    const { id, email, role, profile } = userInput;

    const expires = new Date(Date.now() + TIMEOUT * 1000);
    const session = await encrypt({ id, email, role, profile, expires });

    (await cookies()).set("session", session, { expires, httpOnly: true });
    return { message: "Login Success" }
}

export async function logoutUser() {
    (await cookies()).delete("session");
    return { message: "Logout Success" }
}

export async function getSession(): Promise<any | null> {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;

    return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + TIMEOUT * 1000);

    const response = NextResponse.next();
    response.cookies.set({
        name: "session",
        secure: process.env.NODE_ENV === "production",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    
    return response
}
