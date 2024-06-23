import { IUser } from './user.interface'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthRegister {
	name: string
	password: string
	phone: string
	email: string
}

export interface IAuthLogin {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}

export interface ISendCode {
	email: string
}

export interface IResetPassword {
	code: string
	password: string
}
