import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf
} from 'class-validator'

export class AuthDto {
  @IsOptional()
  @IsString()
  @ValidateIf(obj => !obj.phone)
  email: string

  @IsOptional()
  @IsString()
  @ValidateIf(obj => !obj.email)
  phone: string

  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  name: string
}
