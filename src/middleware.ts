import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { verifyToken } from './helpers/cookies';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token');

  const { pathname } = request.nextUrl;

  const protectedRoutesWhenAuth = ['/auth/sign-in', '/auth/sign-up'];

  if (token) {
    const result = await verifyToken(token.value);

    if (!result) return NextResponse.next();

    if (protectedRoutesWhenAuth.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/auth/:path*'],
};
