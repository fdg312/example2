import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Chat } from '@prisma/client'

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async create(senderId: number, receiverId: number) {
        return await this.prisma.chat.create({
            data: {
                users: {
                    connect: [{ id: senderId }, { id: receiverId }]
                }
            }
        })
    }

    async getMany(id: number) {
        return await this.prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id
                    }
                }
            }
        })
    }
}
