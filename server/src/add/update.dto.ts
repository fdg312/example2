import { IsArray, IsNumber, IsString } from 'class-validator'

export class UpdateAddDto {
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
}
