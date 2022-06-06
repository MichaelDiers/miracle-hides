import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseDatabaseService } from './firebase-database.service';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LoggingModule } from '../logging/logging.module';
import { UserDatabaseService } from './user-database.service';
import { HashModule } from '../hash/hash.module';

@Module({
  providers: [FirebaseDatabaseService, UserDatabaseService],
  imports: [FirebaseModule, ConfigurationModule, LoggingModule, HashModule],
  exports: [UserDatabaseService],
})
export class DatabaseModule {}
