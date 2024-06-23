import { AuthDto } from 'src/auth/auth.dto'

import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto extends AuthDto {
	@IsOptional()
	@IsString({ message: 'Must be a string' })
	avatarPath: string
}
