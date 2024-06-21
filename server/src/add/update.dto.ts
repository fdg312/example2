import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAddDto {
	@IsOptional()
	@IsString()
	title: string

	@IsOptional()
	@IsString()
	phone: string

	@IsOptional()
	@IsString()
	city: string

	@IsOptional()
	@IsString()
	address: string

	@IsOptional()
	@IsString()
	text: string

	@IsOptional()
	@IsNumber()
	price: number

	@IsOptional()
	@IsString()
	subcategory: string

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	images: string[]
}
