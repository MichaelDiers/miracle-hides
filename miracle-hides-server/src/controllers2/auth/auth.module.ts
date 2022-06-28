import { Module } from '@nestjs/common';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { UsersDatabaseModule } from '../../databases/users-database/users-database.module';
import { HashModule } from '../../services/hash/hash.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  exports: [AuthController],
  imports: [UsersDatabaseModule, HashModule, JwtModule],
  providers: [AuthService, AuthController],
})
export class AuthModule {}
