import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import { Category, Add } from '@prisma/client'
import {CreateCategoryDto} from "./create.dto";
import { getSlugify } from 'src/config/slugify';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.category.findMany(
			{
				include: {
					subcategories: true
				}
			}
		)
	}

	async getBySlug(slug: string) {
		console.log(slug);
		
		return await this.prisma.add.findMany(
			{ 
			where: 
			{ subcategory: {
				slug
			}},
			include: {
				subcategory: true
			}
		})
	}

	async create(dto: CreateCategoryDto) {
		let subcategories = dto.subcategories.map(subcategory => ({
			name: subcategory.name,
			slug: getSlugify(subcategory.name),
		}))

		return await this.prisma.category.create({
			data: {
				name: dto.name,
				slug: getSlugify(dto.name),
				subcategories: {
					create: subcategories
				}
			},
			include: {
				subcategories: true
			}
		})
	}
}
