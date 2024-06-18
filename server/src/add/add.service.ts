import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { getSlugify } from 'src/config/slugify'
import { PrismaService } from '../prisma.service'
import { CreateAddDto } from './create.dto'
import { UpdateAddDto } from './update.dto'

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
		const subcategory = await this.prisma.category.findFirst({
			where: {
				slug: dto.subcategory,
			},
		})

		const newAdd = await this.prisma.add.create({
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
						id: subcategory.id,
					},
				},
				user: {
					connect: { id },
				},
			},
		})

		this.prisma.add.update({
			where: {
				id: newAdd.id,
			},
			data: {
				slug: `${getSlugify(newAdd.title)}_${newAdd.id}`,
			},
		})
	}

	async update(id: string, dto: UpdateAddDto, userId: string) {
		const add = await this.prisma.add.findUnique({
			where: {
				id,
			},
		})

		if (!add) throw new NotFoundException('Add not found')

		if (add.userId !== userId)
			throw new BadRequestException('You are not an owner of this add')

		const filteredAddData = Object.fromEntries(
			Object.entries(dto).filter(([key, value]) => value !== add[key])
		)

		return await this.prisma.add.update({
			where: {
				id,
			},
			data: { ...filteredAddData, slug: `${getSlugify(dto.title)}_${add.id}` },
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
