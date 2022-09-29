import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, TOKEN_HEADER_NAME } from './data/constants'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  console.log('request', request.headers)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: '/cart/:path*'
}
