import {ArrayContains, IsArray, IsNumber, IsString, ValidateNested} from "class-validator";
import { Type } from 'class-transformer';

export class CreateCategoryDto {
	@IsString()
	name: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SubcategoryDto)
	subcategories: SubcategoryDto[];
}

class SubcategoryDto {
	@IsString()
	name: string
}