import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateAddDto} from "./create.dto";
import { Add } from '@prisma/client'
import { getSlugify } from 'src/config/slugify';

@Injectable()
export class AddService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(take: number = 10, text: string, city: string) {	
		return await this.prisma.add.findMany({ 
			where: {
				title: {
					contains: text,
					mode: 'insensitive'
				},
				city
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
				subcategory: true
			},
			take: +take })
	}

	async getById(id: number) {
		return await this.prisma.add.findUnique({ where: { id },
			include: {
				user: true,
				favourites: true,
				category: true,
				subcategory: true
			}
		})
	}

	async getByUser(id: number) {
		return await this.prisma.add.findMany({ where: { 
			user: { id }
		 },
			include: {
				user: true
			}
		})
	}

	async getByFavourites(userId: number) {
		return await this.prisma.add.findMany({ where: { 
			favourites: { some: { userId } }
		 },
			include: {
				favourites: true
			}
		})
	}

	async create(dto: CreateAddDto, id: number) {
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
						name: dto.category
					}
				},
				subcategory: {
					connect: {
						slug: dto.subcategory
					}
				},
				user: {
					connect: { id }
				}
			}
		})
	}

	async delete (id: number, userId: number) {
		return await this.prisma.add.delete({ where: { 
			id, 
			user: { id: userId }
		} })
	}
}
