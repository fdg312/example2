import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { AuthDto } from './auth.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { MailService } from 'src/mail/mail.service'
import { Scheduler } from './scheduler'


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private mailService: MailService, private scheduler: Scheduler) {}

  async forgotPassword(email: string) {    
    const user = await this.prisma.user.findUnique({ where: { email } })
    
    if (!user) throw new BadRequestException('User already is not exists')
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await this.prisma.user.update({ where: { id: user.id }, data: { verificationCode }});
    this.scheduler.deleteVerificationCode(email);
    return await this.mailService.sendMail(user.email, 'verification code', verificationCode.toString());
  }

  async verifyCode(email: string, password: string, code: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user || user.verificationCode !== +code) throw new Error('Invalid verification code');
    if (user.password === password) throw new Error('Old password');
    if (!user.verificationCode) throw new Error('Verification code expired or email is not verified');

    await this.prisma.user.update({ where: { id: user.id }, data: { password: await hash(password), verificationCode: null } });
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    
    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id
      }
    })

    const tokens = await this.issueTokens(user.id)

    return { user, ...tokens }
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return { user: user, ...tokens }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (oldUser) throw new BadRequestException('User already exists')

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        phone: dto.phone,
        name: dto.name
      }
    })

    const tokens = await this.issueTokens(user.id)

    return { user: user, ...tokens }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}
