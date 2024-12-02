import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret");

export default async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Contains user data (id, role, etc.)
  } catch {
    return null; // Invalid token
  }
}
