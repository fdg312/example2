import { NextRequest, NextResponse } from 'next/server'
import useAuth from './stores/authStore'

const pattern = new RegExp('^/adds(?:/[^/]+)*/update$')

export function middleware(request: NextRequest) {
	const { isAuth } = useAuth()
	if (isAuth) return NextResponse.next()
	return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
	matcher: [
		'/adds',
		'/settings',
		'/adds/:path*/update',
		'/favourites',
		'/profile',
	],
}
