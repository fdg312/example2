import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ChatService {
	constructor(private readonly prisma: PrismaService) {}

	async createChat(senderId: string, receiverId: string) {
		return await this.prisma.chat.create({
			data: {
				users: {
					connect: [{ id: senderId }, { id: receiverId }],
				},
			},
		})
	}

	async createMessage(senderId: string, chatId: string, text: string) {
		return await this.prisma.message.create({
			data: {
				text,
				sender: {
					connect: {
						id: senderId,
					},
				},
				chat: {
					connectOrCreate: {
						where: {
							id: chatId,
						},
						create: {
							id: chatId,
						},
					},
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
