import instance from '@/core/api.interceptor'
import { IAddResponse } from '@/types/add.interface'

export const AddService = {
	async getAll(
		take: number | string = '',
		text: string = '',
		city: string = ''
	) {
		try {
			city == '' && (city = localStorage.getItem('city'))

			take = take && `take=${take}`
			text = text && `&search=${text}`
			let cityValue = city == 'Россия' ? '' : city
			cityValue = cityValue && `&city=${cityValue}`

			// const response = await instance.get(`/adds?${take}${text}${cityValue}`)
			const response = await fetch(
				`http://localhost:3000/api/adds?${take}${text}${cityValue}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					next: { revalidate: 50 },
				}
			).then(res => res.json())

			return response
		} catch (e) {}
	},

	async getBySlug(slug: string): Promise<IAddResponse> {
		try {
			const response = await instance.get('/adds/by-slug/' + slug)

			return response.data
		} catch (e) {
			throw e
		}
	},

	async getById(id: string): Promise<IAddResponse> {
		try {
			const response = await instance.get('/adds/by-id/' + id)

			return response.data
		} catch (e) {
			throw e
		}
	},

	async getByFavourites() {
		try {
			const response = await instance.get('/adds/by-favourites/')

			return response.data
		} catch (e) {}
	},

	async getByUser() {
		try {
			const response = await instance.get('/adds/by-user')

			return response.data
		} catch (e) {}
	},

	async create(data: any) {
		try {
			const response = await instance.post('/adds', data)

			return response.data
		} catch (e) {}
	},

	async update(data: any, id: string) {
		try {
			const response = await instance.put('/adds/' + id, data)

			return response.data
		} catch (e) {}
	},
}
