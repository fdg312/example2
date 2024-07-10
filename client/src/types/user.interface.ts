export interface IUser {
	id: string
	createdAt: Date
	email?: string
	phone?: string
	password?: string
	name: string
}

export interface IResponseUser extends IUser {
	avatarPath: string
}
