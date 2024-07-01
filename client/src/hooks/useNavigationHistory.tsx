import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

const useNavigationHistory = () => {
	const router = useRouter()
	const historyRef = useRef<string[]>([])

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			historyRef.current.push(url)
		}

		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	const getPreviousPath = () => {
		if (historyRef.current.length > 1) {
			return historyRef.current[historyRef.current.length - 2]
		}
		return null
	}

	return { getPreviousPath }
}

export default useNavigationHistory
