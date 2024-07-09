import { Module } from '@nestjs/common'
import { MessageService } from 'src/message/message.service'
import { PrismaService } from 'src/prisma.service'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
	controllers: [ChatController],
	providers: [ChatService, PrismaService, MessageService],
})
export class ChatModule {}
