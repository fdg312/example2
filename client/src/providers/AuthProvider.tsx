'use client'

import useAuth from '@/stores/authStore'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { checkAuth, user, logout, isAuth } = useAuth()
	const [isOpen, setIsOpen] = useState(false)

	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) logout()
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
