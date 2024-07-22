import Cookies from 'js-cookie'
import { NextRequest, NextResponse } from 'next/server'

const pattern = new RegExp('^/adds(?:/[^/]+)*/update$')

export function middleware(request: NextRequest) {
	const isAuth = Cookies.get('user')

	if (isAuth) return NextResponse.next()
	return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
	matcher: [
		// '/adds',
		'/settings',
		'/adds/:path*/update',
		'/favourites',
		'/profile',
	],
}
