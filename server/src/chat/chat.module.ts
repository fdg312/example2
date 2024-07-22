import { Module } from '@nestjs/common'
import { MessageService } from '../message/message.service'
import { PrismaService } from '../prisma.service'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
	controllers: [ChatController],
	providers: [ChatService, PrismaService, MessageService],
})
export class ChatModule {}
