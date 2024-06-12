import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User } from '@prisma/client'
import { AuthDto } from 'src/auth/auth.dto'
import { UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany()
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(dto: UpdateUserDto, id: number) {   
    const filteredUserData = Object.entries(dto).reduce((acc, [key, value]) => {
      if (value.length > 0) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    return this.prisma.user.update({
      where: {
        id
      },
      data: filteredUserData
    })
  }
}
