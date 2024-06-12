import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':id')
  async getMany(@Param('id') id: number) {
    return await this.messageService.getMany(+id)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@CurrentUser('id') senderId: number, @Body('text') text: string, @Body('chatId') chatId: number) {
    return await this.messageService.create(senderId, chatId, text)
  }
}
