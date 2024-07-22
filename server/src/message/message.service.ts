import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class MessageService {
	constructor(private readonly prisma: PrismaService) {}

	async getChat(id: string) {
		return await this.prisma.message.findMany({
			where: {
				chatId: id,
			},
		})
	}

	async create(senderId: string, chatId: string, text: string) {
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
}
