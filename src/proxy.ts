import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || ''

  const isPublicPath = path === '/' || path === '/login' || path === '/signup'

  if (token && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }
  
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/', 
    '/profile/:path*',
    '/login', 
    '/signup'
  ]
}