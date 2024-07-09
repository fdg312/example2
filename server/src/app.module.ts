import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { AddModule } from './add/add.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { ChatGateway } from './chat/chat.gateway'
import { ChatModule } from './chat/chat.module'
import { FavouriteModule } from './favourite/favourite.module'
import { MailModule } from './mail/mail.module'
import { MessageModule } from './message/message.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		MulterModule.register({
			dest: './uploads',
		}),
		AuthModule,
		UserModule,
		CategoryModule,
		AddModule,
		ChatModule,
		MessageModule,
		FavouriteModule,
		MailModule,
	],
	controllers: [AppController],
	providers: [AppService, ChatGateway],
})
export class AppModule {}
