import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '../config/jwt.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { MailService } from 'src/mail/mail.service'
import { ScheduleModule } from '@nestjs/schedule';
import { Scheduler } from './scheduler'

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, MailService, Scheduler]
})
export class AuthModule {}
