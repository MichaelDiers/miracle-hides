import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { DatabaseService } from './database.service';
import { FirebaseDatabaseService } from './firebase-database.service';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  providers: [DatabaseService, FirebaseDatabaseService],
  imports: [FirebaseModule, ConfigurationModule],
  exports: [DatabaseService],
})
export class DatabaseModule {}
