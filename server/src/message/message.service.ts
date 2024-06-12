import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Message } from '@prisma/client'

@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) {}

    async getMany(id: number) {
        return await this.prisma.message.findMany({
            where: {
                chatId: id
            }
        })
    }

    async create(senderId: number, chatId: number, text: string) {
        return await this.prisma.message.create({
            data: {
                text,
                sender: {
                    connect: {
                        id: senderId
                    }
                },
                chat: {
                    connectOrCreate: {
                        where: {
                            id: chatId
                        },
                        create: {
                            id: chatId
                    }
                }}
            }
        })
    }
}
