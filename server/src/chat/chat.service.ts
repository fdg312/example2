import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Chat } from '@prisma/client'

@Injectable()
export class ChatService {
	constructor(private readonly prisma: PrismaService) {}

	async create(senderId: string, receiverId: string) {
		return await this.prisma.chat.create({
			data: {
				users: {
					connect: [{ id: senderId }, { id: receiverId }],
				},
			},
		})
	}

	async getMany(id: string) {
		return await this.prisma.chat.findMany({
			where: {
				users: {
					some: {
						id,
					},
				},
			},
		})
	}
}
