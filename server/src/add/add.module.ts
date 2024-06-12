import { Module } from '@nestjs/common';
import { AddService } from './add.service';
import { AddController } from './add.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [AddController],
  providers: [AddService, PrismaService]
})
export class AddModule {}
