import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/services/config/config.module';
import { FirebaseModule } from 'src/services/firebase/firebase.module';
import { MessagesDatabaseService } from './messages-database.service';

@Module({
  exports: [MessagesDatabaseService],
  imports: [ConfigModule, FirebaseModule],
  providers: [MessagesDatabaseService]
})
export class MessagesDatabaseModule {}
