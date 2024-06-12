import { AuthDto } from "src/auth/auth.dto";

import {
    IsArray,
    IsOptional,
  } from 'class-validator'

export class UpdateUserDto extends AuthDto {
    @IsOptional()
    avatarPath: string
}