import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, TOKEN_HEADER_NAME } from './data/constants'

export function middleware(request: NextRequest, res: NextResponse) {
  const url = request.nextUrl

  if (res) {
    console.log('res', res.cookies)
  }

  if (res && res.cookies) {
    for (const [key, value] of Object.entries(res.cookies)) {
      console.log(`${key}: ${value}`)
    }
  }

  return NextResponse.rewrite(url)
  // res.cookies.set(COOKIE_NAME, 'ABC')
  // res.headers.set(TOKEN_HEADER_NAME, 'ABC')
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!static|favicon.ico).*)'
  ]
}
