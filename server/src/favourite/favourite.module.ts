import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { FavouriteController } from './favourite.controller'
import { FavouriteService } from './favourite.service'

@Module({
	controllers: [FavouriteController],
	providers: [FavouriteService, PrismaService],
})
export class FavouriteModule {}
