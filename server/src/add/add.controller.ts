import {Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { AddService } from './add.service';
import {CreateAddDto} from "./create.dto";
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import { text } from 'stream/consumers';

@Controller('adds')
export class AddController {
  constructor(private readonly addService: AddService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  async getAll(@Query('take') take: number, @Query('search') text: string, @Query('city') city: string){
    console.log(city);
    
    return await this.addService.getAll(take, text, city)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/by-id/:id')
  async getById(@Param('id') id: number){
    return await this.addService.getById(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get('/by-user')
  async getByUser(@CurrentUser('id') id: number){
    return await this.addService.getByUser(+id)
  }



  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@CurrentUser('id') userId: number, @Body() dto: CreateAddDto){
    return await this.addService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete()
  async delete(@CurrentUser('id') userId: number, @Body('id') id: number){
    return await this.addService.delete(id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get('/by-favourites')
  async getByFavourites(@CurrentUser('id') userId: number){
    return await this.addService.getByFavourites(userId)
  }
}
