import { BadRequestException, Injectable } from '@nestjs/common'
import { getSlugify } from 'src/config/slugify'
import { PrismaService } from '../prisma.service'
import { CreateCategoryDto } from './create.dto'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.category.findMany({
			include: {
				subcategories: true,
			},
		})
	}

	async getBySlug(slug: string) {
		return await this.prisma.add.findMany({
			where: {
				subcategory: {
					slug,
				},
			},
			include: {
				subcategory: true,
			},
		})
	}

	async create(dto: CreateCategoryDto) {
		const category = await this.prisma.category.findUnique({
			where: {
				name: dto.name,
			},
		})

		if (category) throw new BadRequestException('Category already exists')

		let subcategories = dto.subcategories.map(subcategory => ({
			name: subcategory.name,
			slug: getSlugify(subcategory.name),
		}))

		return await this.prisma.category.create({
			data: {
				name: dto.name,
				slug: getSlugify(dto.name),
				subcategories: {
					create: subcategories,
				},
			},
			include: {
				subcategories: true,
			},
		})
	}
}
