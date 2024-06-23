import instance from "@/core/api.interceptor";

export const FavouriteService = {
	async getAll() {
		try {
			const response = await instance.post("/favourites")
			
			return response.data
		} catch (e) {}
	},

	async create(id: string) {
		try {
			const response = await instance.post("/favourites/create", { addId: id })
			
			return response.data
		} catch (e) {}
	},

    async delete(id: string) {
		try {
			const response = await instance.delete("/favourites/" + id)
			
			return response.data
		} catch (e) {}
	},
};