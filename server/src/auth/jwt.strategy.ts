import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { getJwtConfig } from '../config/jwt.config'
import { PrismaService } from '../prisma.service'
import { User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		return this.prisma.user.findUnique({
			where: {
				id: id,
			},
		})
	}
}
