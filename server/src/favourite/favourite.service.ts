import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Favourite } from '@prisma/client';

@Injectable()
export class FavouriteService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(id: number) {
        return await this.prisma.favourite.findMany(
            {
                where: {
                    user: {
                        id: +id,      
                    } 
                },
                include: {
                    add: true
                }
            }
        );
    }

    async create(id: number, addId: number) {
        if (await this.check(id, addId)) throw new Error('Favourite exists already!')
        
        return await this.prisma.favourite.create({
            data: {
                user: {
                    connect: {
                        id
                    }
                },
                add: {
                    connect: {
                        id: addId
                    }
                }
            }
        })
    }

    async delete(id: number, addId: number) {
        if (!await this.check(id, addId)) throw new Error('Favourite not found')

        return await this.prisma.favourite.deleteMany({
            where: {
                user: {
                    id
                },
                add: {
                    id: addId
                }
            }
        },)
    }

    async check(id: number, addId: number) {
        return await this.prisma.favourite.findFirst({
            where: {
                user: {
                    id
                },
                add: {
                    id: addId
                }
            }
        })
    }
}
