import { IUser } from "./user.interface";

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IAuthRegister {
	name: string;
	password: string;
	phone: string;
	email: string;
}

export interface IAuthLogin {
	email: string;
	password: string;
}

export interface IAuthResponse extends ITokens {
	user: IUser;
}