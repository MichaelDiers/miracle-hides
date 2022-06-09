import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { JwtService } from './jwt.service';

@Module({
  exports: [JwtService],
  providers: [JwtService],
  imports: [FirebaseModule],
})
export class JwtModule {}
