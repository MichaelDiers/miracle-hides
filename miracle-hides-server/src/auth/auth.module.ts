import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthService],
})
export class AuthModule {}
