import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class FavouriteService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		})

		if (!user) throw new NotFoundException('User not found')

		return await this.prisma.favourite.findMany({
			where: {
				user: {
					id: id,
				},
			},
			include: {
				add: true,
			},
		})
	}

	async create(id: string, addId: string) {
		if (await this.check(id, addId))
			throw new NotFoundException('Favourite exists already!')

		return await this.prisma.favourite.create({
			data: {
				user: {
					connect: {
						id,
					},
				},
				add: {
					connect: {
						id: addId,
					},
				},
			},
		})
	}

	async delete(id: string, addId: string) {
		if (!(await this.check(id, addId)))
			throw new NotFoundException('Favourite not found')

		return await this.prisma.favourite.deleteMany({
			where: {
				user: {
					id,
				},
				add: {
					id: addId,
				},
			},
		})
	}

	async check(id: string, addId: string) {
		return await this.prisma.favourite.findFirst({
			where: {
				user: {
					id,
				},
				add: {
					id: addId,
				},
			},
		})
	}
}
