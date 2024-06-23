import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  UsePipes
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { RefreshTokenDto } from './refresh.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return await this.authService.register(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return await this.authService.getNewTokens(dto.refreshToken)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    console.log(email);
    
    return await this.authService.forgotPassword(email)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('verify-code')
  async verifyCode(@Body('email') email: string, @Body('code') code: string, @Body('password') password: string) {
    return await this.authService.verifyCode(email, password, code)
  }
}
