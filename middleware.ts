import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const headers = new Headers(req.headers);

  const { pathname } = new URL(req.url);
  headers.set('x-current-path', pathname);

  const isAuthenticated = !!session?.user;
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (isDashboardRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
