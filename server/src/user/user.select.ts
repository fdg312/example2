import { Prisma } from '@prisma/client'

export const userSelect: Prisma.UserSelect = {
	createdAt: true,
	avatarPath: true,
	email: true,
	id: true,
	phone: true,
	name: true,
}
