import instance from "@/core/api.interceptor";
import { saveToStorage } from "@/core/handleTokens";
import Cookies from "js-cookie";
import { getContentType } from "@/core/api.hepler";
import {IAuthLogin, IAuthRegister, IAuthResponse} from "../types/auth.interface";


export const AuthService = {
	async getNewTokens() {
		const refreshToken = Cookies.get("refreshToken");

		const response = await instance.post(
			"/auth/login/access-token",
			{ refreshToken },
			{ headers: getContentType() }
		);

		if (response.data.accessToken) saveToStorage(response.data);

		return response;
	},

	async register(data: IAuthRegister) {
		try {
			console.log(data);
			
			const response = await instance.post("/auth/register", data);
			console.log(response);
			
			if (response.status === 200) {
				saveToStorage({
					user: { ...data },
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
			});
			}

			return response.data;
		} catch (error) {}
	},

	async login(data: IAuthLogin) {
		try {
			let response = await instance.post("/auth/login", data);

			if (response.status === 200) {
				saveToStorage({
					user: { ...data },
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
			});
			}
			
			return response.data;
		} catch (error) {}
	},

	async forgotPassword(email: string) {
		try {
			console.log(email, 'email');
			
			const response = await instance.post("/auth/forgot-password", { email: email });
			return response.data;
		} catch (error) {}
	},

	async verifyCode(email: string, password: string, code: string) {
		try {
			const response = await instance.post("/auth/verify-code", { email, password, code });
			return response.data;
		} catch (error) {}
	}
};