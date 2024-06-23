import {Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from "../auth/decorators/auth.decorator";
import {CreateCategoryDto} from "./create.dto";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@Body() dto: CreateCategoryDto){
    return await this.categoryService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  async getAll(){
    return await this.categoryService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string){
    return await this.categoryService.getBySlug(slug)
  }
}
