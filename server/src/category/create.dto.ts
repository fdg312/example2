import { Type } from 'class-transformer'
import {
	IsArray,
	IsString,
	MaxLength,
	MinLength,
	ValidateNested,
} from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: 'Категория должна быть строкой' })
	@MinLength(3, { message: 'Категория должна содержать не менее 3 символов' })
	@MaxLength(20, { message: 'Категория должна содержать не более 20 символов' })
	name: string

	@IsArray({ message: 'Подкатегории должны быть массивом' })
	@ValidateNested({ each: true })
	@Type(() => SubcategoryDto)
	subcategories: SubcategoryDto[]
}

class SubcategoryDto {
	@IsString({ message: 'Подкатегория должна быть строкой' })
	@MinLength(3, {
		message: 'Подкатегория должна содержать не менее 3 символов',
	})
	@MaxLength(20, {
		message: 'Подкатегория должна содержать не более 20 символов',
	})
	name: string
}
