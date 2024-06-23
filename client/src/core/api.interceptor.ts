import { errorCatch } from '@/core/api.hepler'
import { removeTokensStorage } from '@/core/handleTokens'
import { AuthService } from '@/services/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
	baseURL: process.env.SERVER_URL,
})

instance.interceptors.request.use(async config => {
	const accessToken = Cookies.get('accessToken')

	if (accessToken && config.headers)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()

				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeTokensStorage()
				}
			}
		}
	}
)

export default instance
