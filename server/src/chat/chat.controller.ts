import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(
		@Body() receiverId: string,
		@CurrentUser('id') senderId: string
	) {
		{
			this.chatService.create(senderId, receiverId)
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async getMany(@CurrentUser('id') id: string) {
		return await this.chatService.getMany(id)
	}
}
