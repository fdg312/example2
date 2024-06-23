import instance from "@/core/api.interceptor";

export const UploadService = {
	async upload(files: File[]) {
		try {
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("image", files[i]);
            }
            
			const response = await instance.post("/upload", formData,
                { headers: { "Content-Type": "multipart/form-data" } })
			console.log(response.data);
			
			return response.data
		} catch (e) {}
	},
};