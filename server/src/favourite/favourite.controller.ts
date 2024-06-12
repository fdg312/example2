import { Body, Controller, Delete, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('favourites')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async getAll(@CurrentUser('id') id: number) {
    return await this.favouriteService.getAll(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('/create')
  async create(@CurrentUser('id') id: number, @Body('addId') addId: number) {
    return await this.favouriteService.create(+id, +addId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete('/:id')
  async delete(@CurrentUser('id') id: number, @Param('id') addId: number) {
    return await this.favouriteService.delete(+id, +addId);
  }
}
