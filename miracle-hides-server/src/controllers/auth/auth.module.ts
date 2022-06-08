import { Module } from '@nestjs/common';
import { UsersDatabaseModule } from '../../databases/users-database/users-database.module';
import { HashModule } from '../../services/hash/hash.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UsersDatabaseModule, HashModule],
  providers: [AuthService],
})
export class AuthModule {}
