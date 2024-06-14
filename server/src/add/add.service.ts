import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { getSlugify } from 'src/config/slugify'
import { PrismaService } from '../prisma.service'
import { CreateAddDto } from './create.dto'

@Injectable()
export class AddService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(take: number = 10, text: string, city: string) {
		return await this.prisma.add.findMany({
			where: {
				title: {
					contains: text,
					mode: 'insensitive',
				},
				city,
			},
			// orderBy: {
			// 	_relevance: {
			// 		fields: ['title'],
			// 		search: text?.replace(/ /g, '+') || '',
			// 		sort: 'desc',
			// 	}
			// },
			include: {
				category: true,
				subcategory: true,
			},
			take: +take,
		})
	}

	async getById(id: string) {
		return await this.prisma.add.findUnique({
			where: { id },
			include: {
				user: true,
				favourites: true,
				category: true,
				subcategory: true,
			},
		})
	}

	async getByUser(id: string) {
		return await this.prisma.add.findMany({
			where: {
				user: { id },
			},
			include: {
				user: true,
			},
		})
	}

	async getByFavourites(userId: string) {
		return await this.prisma.add.findMany({
			where: {
				favourites: { some: { userId } },
			},
			include: {
				favourites: true,
			},
		})
	}

	async create(dto: CreateAddDto, id: string) {
		return await this.prisma.add.create({
			data: {
				slug: getSlugify(dto.title),
				title: dto.title,
				address: dto.address,
				city: dto.city,
				phone: dto.phone,
				images: dto.images,
				text: dto.text,
				price: dto.price,
				category: {
					connect: {
						slug: dto.category,
					},
				},
				subcategory: {
					connect: {
						slug: dto.subcategory,
					},
				},
				user: {
					connect: { id },
				},
			},
		})
	}

	async delete(id: string, userId: string) {
		const add = await this.prisma.add.findUnique({
			where: {
				id,
			},
		})

		if (!add) throw new NotFoundException('Add not found')

		if (add.userId !== userId)
			throw new BadRequestException('You are not an owner of this add')

		return await this.prisma.add.delete({
			where: {
				id,
				user: { id: userId },
			},
		})
	}
}
