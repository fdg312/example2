import {
	Body,
	Controller,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { MessageService } from './message.service'

@Controller('message')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post(':id')
	async getChat(@Param('id') id: string) {
		return await this.messageService.getChat(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(
		@CurrentUser('id') senderId: string,
		@Body('text') text: string,
		@Body('chatId') chatId: string
	) {
		return await this.messageService.create(senderId, chatId, text)
	}
}
