import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get('session');

    if (!sessionCookie) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    return NextResponse.json({ session });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch session data' }, { status: 500 });
  }
}
