export interface IUser {
	id?: number;
	createdAt?: string;
	email?: string;
	phone?: string;
	password?: string;
	name?: string;
}

export interface IResponseUser extends IUser {
    avatarPath: string
}