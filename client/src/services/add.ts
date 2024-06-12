import instance from "@/core/api.interceptor";
import useSessionStore from "@/stores/sessionStore";
import { IAdd } from "@/types/add.interface";


export const AddService = {
	async getAll(take: number | string = '', text: string = '', city: string = '') {

		try {	
			city == '' && (city = localStorage.getItem('city'))
			console.log(city, 'city');
			
			take = take && `take=${take}`
			text = text && `&search=${text}`
			let cityValue = (city == 'Россия' ? '' : city)
			cityValue = cityValue && `&city=${cityValue}`
			console.log(cityValue, `/adds?${take}${text}${cityValue}`);
			
			const response = await instance.get(`/adds?${take}${text}${cityValue}`)
			console.log(response.data, "response.data", cityValue);
			
			return response.data
		} catch (e) {}
	},

	async getById(id: string) {
		try {
			const response = await instance.get("/adds/by-id/" + id)
			
			return response.data
		} catch (e) {}
	},

	async getByFavourites() {
		try {
			const response = await instance.get("/adds/by-favourites/")
			
			return response.data
		} catch (e) {}
	},

	async getByUser() {
		try {
			const response = await instance.get("/adds/by-user")
			
			return response.data
		} catch (e) {}
	},


	async create(data: any) {
		try {	
			const response = await instance.post("/adds", data)

			return response.data
		} catch (e) {}
	},
};