import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { AddService } from './add.service'
import { CreateAddDto } from './create.dto'
import { UpdateAddDto } from './update.dto'

@Controller('adds')
export class AddController {
	constructor(private readonly addService: AddService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get()
	async getAll(
		@Query('take') take: number,
		@Query('search') text: string,
		@Query('city') city: string
	) {
		return await this.addService.getAll(take, text, city)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('/by-id/:id')
	async getById(@Param('id') id: string) {
		return await this.addService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('/by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return await this.addService.getBySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Get('/by-user')
	async getByUser(@CurrentUser('id') id: string) {
		return await this.addService.getByUser(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: string, @Body() dto: CreateAddDto) {
		return await this.addService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Delete()
	async delete(@CurrentUser('id') userId: string, @Body('id') id: string) {
		return await this.addService.delete(id, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('/:id')
	async update(
		@CurrentUser('id') userId: string,
		@Body() dto: UpdateAddDto,
		@Param('id') id: string
	) {
		return await this.addService.update(id, dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Get('/by-favourites')
	async getByFavourites(@CurrentUser('id') userId: string) {
		return await this.addService.getByFavourites(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get(':id/related')
	async getRelated(@Param('id') id: string, @Query('take') take: string) {
		console.log(123)

		return await this.addService.getRelated(id, +take)
	}
}
