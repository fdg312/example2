import instance from "@/core/api.interceptor";
import { IUser, IResponseUser } from "@/types/user.interface";

export const UserService = {
    async update(dto: IResponseUser) {
        try {
            const response = await instance.put("/users", dto)
            
            return response.data
        } catch (e) {}
    },

    async getById() {
        try {
            const response = await instance.get("/by-id")
            
            return response.data
        } catch (e) {}
    }
}