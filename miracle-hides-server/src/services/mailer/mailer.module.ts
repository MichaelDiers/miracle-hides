import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MailerService } from './mailer.service';

@Module({
  exports: [MailerService],
  imports: [ConfigModule],
  providers: [MailerService]
})
export class MailerModule {
}
