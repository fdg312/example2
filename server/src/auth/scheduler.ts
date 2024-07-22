import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { PrismaService } from '../prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class Scheduler {
	constructor(
		private readonly schedulerRegistry: SchedulerRegistry,
		private prisma: PrismaService
	) {}

	async deleteVerificationCode(email: string) {
		const callback = async () => {
			await this.prisma.user.update({
				where: { email },
				data: { verificationCode: null },
			})
		}

		const timeout = setTimeout(callback, 60000)
		// Schedule a task to delete the verification code after 10 minutes
		this.schedulerRegistry.addTimeout(`code-${email}`, timeout)
	}
}
