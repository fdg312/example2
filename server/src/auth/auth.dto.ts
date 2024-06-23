import {
	IsEmail,
	IsMobilePhone,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'

export class AuthDto {
	@IsEmail({}, { message: 'Email должен быть валидным' })
	email: string

	@MinLength(8, {
		message: 'Пароль должен содержать не менее 8 символов',
	})
	@MaxLength(20, {
		message: 'Пароль должен содержать не более 20 символов',
	})
	@IsString({ message: 'Пароль должен быть строкой' })
	password: string

	@IsOptional()
	@IsMobilePhone(
		'ru-RU',
		{},
		{ message: 'Номер телефона должен быть валидным' }
	)
	phone: string

	@IsOptional()
	@MinLength(3, { message: 'Имя должно содержать не менее 3 символов' })
	@MaxLength(20, { message: 'Имя должно содержать не более 20 символов' })
	@IsString({ message: 'Имя должно быть строкой' })
	name: string
}
