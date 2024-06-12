import instance from "@/core/api.interceptor";


export const CategoryService = {
	async getAll() {
		try {
			const response = await instance.get("/categories")
			
			return response.data
		} catch (e) {}
	},

	async getBySlug(slug: string) {
		try {
			const response = await instance.get("/categories/" + slug)
			
			return response.data
		} catch (e) {}
	},
};