import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { HashModule } from '../hash/hash.module';
import { DatabaseModule } from '../database/database.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  imports: [ConfigurationModule, DatabaseModule, FirebaseModule, HashModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthService],
})
export class AuthModule {}
