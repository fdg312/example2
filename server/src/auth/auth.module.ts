import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ScheduleModule } from '@nestjs/schedule'
import { MailService } from 'src/mail/mail.service'
import { getJwtConfig } from '../config/jwt.config'
import { PrismaService } from '../prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { Scheduler } from './scheduler'

@Module({
	imports: [
		ConfigModule.forRoot(),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		ScheduleModule.forRoot(),
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy, MailService, Scheduler],
})
export class AuthModule {}
