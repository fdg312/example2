import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.user.findMany()
	}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.user.findUnique({
			where: { id },
		})
	}

	async update(dto: UpdateUserDto, id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
		})

		if (!user) throw new NotFoundException('User not found')

		const filteredUserData = Object.entries(dto).reduce((acc, [key, value]) => {
			if (value.length > 0) {
				acc[key] = value
			}
			return acc
		}, {})

		return this.prisma.user.update({
			where: {
				id,
			},
			data: filteredUserData,
		})
	}
}
