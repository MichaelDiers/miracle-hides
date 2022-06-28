import { Module } from '@nestjs/common';
import { MessagesDatabaseModule } from 'src/databases/messages-database/messages-database.module';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  imports: [JwtModule, MessagesDatabaseModule],
  providers: [MessagesService]
})
export class MessagesModule {}
