'use client'

import useAuth from '@/stores/authStore'
import useSessionStore from '@/stores/sessionStore'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { checkAuth, user, logout } = useAuth()
	const { previousPage, setPreviousPage } = useSessionStore()

	const pathname = usePathname()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		console.log(previousPage)

		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()

		if (previousPage[1] !== pathname && !pathname.split('/').includes('auth')) {
			return setPreviousPage([previousPage[1], pathname])
		}
	}, [pathname])

	// useEffect(() => {
	//     if (protectedRoutes.includes(pathname.split('/')[pathname.split('/').length - 1])) {
	//         if (!isAuth) {
	//             router.push('/login')
	//         }
	//     }
	// }, [pathname])

	return <>{children}</>
}

export default AuthProvider
