import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        host: 'smtp.gmail.ru',
        auth: {
          user: 'ffedorovzx@gmail.com',
          pass: 'qsli efnf aqgd llmh'
        }
      },
    })
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
