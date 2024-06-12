import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import { CategoryModule } from './category/category.module';
import { AddModule } from './add/add.module';
import { MulterModule } from '@nestjs/platform-express';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { FavouriteModule } from './favourite/favourite.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [    
    MulterModule.register({
      dest: './uploads'
    }), AuthModule, UserModule, CategoryModule, AddModule, ChatModule, MessageModule, FavouriteModule, MailModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
