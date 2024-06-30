import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	NextResponse.redirect(new URL('/auth/login', request.url))
	return console.log(request.headers)
}

export const config = {
	matcher: '/adds',
}
