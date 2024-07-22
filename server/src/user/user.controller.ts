import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UpdateUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAll() {
		return this.userService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Get('by-id')
	async getById(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put()
	async update(@Body() dto: UpdateUserDto, @CurrentUser('id') id: string) {
		return this.userService.update(dto, id)
	}
}
