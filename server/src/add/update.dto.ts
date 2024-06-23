import {
	ArrayMaxSize,
	IsArray,
	IsMobilePhone,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'

export class UpdateAddDto {
	@IsOptional()
	@IsString({ message: 'Заголовок должен быть строкой' })
	@MinLength(3, { message: 'Заголовок должен содержать не менее 3 символов' })
	@MaxLength(20, { message: 'Заголовок должен содержать не более 20 символов' })
	title: string

	@IsOptional()
	@IsMobilePhone(
		'ru-RU',
		{},
		{ message: 'Номер телефона должен быть валидным' }
	)
	phone: string

	@IsOptional()
	@IsString({ message: 'Город должен быть строкой' })
	@MinLength(3, { message: 'Город должен содержать не менее 3 символов' })
	@MaxLength(20, { message: 'Город должен содержать не более 20 символов' })
	city: string

	@IsOptional()
	@IsString({ message: 'Адрес должен быть строкой' })
	@MinLength(3, { message: 'Адрес должен содержать не менее 3 символов' })
	@MaxLength(20, { message: 'Адрес должен содержать не более 20 символов' })
	address: string

	@IsOptional()
	@IsString({ message: 'Текст должен быть строкой' })
	@MinLength(10, { message: 'Текст должен содержать не менее 10 символов' })
	@MaxLength(1000, { message: 'Текст должен содержать не более 1000 символов' })
	text: string

	@IsOptional()
	@IsNumber({}, { message: 'Цена должна быть числом' })
	price: number

	@IsOptional()
	@IsString({ message: 'Подкатегория должна быть строкой' })
	@MinLength(3, {
		message: 'Подкатегория должна содержать не менее 3 символов',
	})
	@MaxLength(20, {
		message: 'Подкатегория должна содержать не более 20 символов',
	})
	subcategory: string

	@IsOptional()
	@IsArray({ message: 'Изображения должны быть массивом' })
	@ArrayMaxSize(8, { message: 'Максимальное количество изображений - 8' })
	@IsString({ each: true, message: 'Каждое изображение должно быть строкой' })
	images: string[]
}
