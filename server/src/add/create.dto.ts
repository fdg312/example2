import {IsArray, IsNumber, IsString} from "class-validator";

export class CreateAddDto {
	@IsString()
	title: string

	@IsString()
	phone: string

	@IsString()
	city: string

	@IsString()
	address: string

	@IsString()
	text: string

	@IsNumber()
	price: number

	@IsArray()
	@IsString({ each: true })
	images: string[]

	@IsString()
	category: string

	@IsString()
	subcategory: string
}