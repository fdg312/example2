import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { FavouriteService } from './favourite.service'

@Controller('favourites')
export class FavouriteController {
	constructor(private readonly favouriteService: FavouriteService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async getAll(@CurrentUser('id') id: string) {
		return await this.favouriteService.getAll(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('/create')
	async create(@CurrentUser('id') id: string, @Body('addId') addId: string) {
		return await this.favouriteService.create(id, addId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Delete('/:id')
	async delete(@CurrentUser('id') id: string, @Param('id') addId: string) {
		return await this.favouriteService.delete(id, addId)
	}
}
