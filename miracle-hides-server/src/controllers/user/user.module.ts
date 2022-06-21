import { Module } from '@nestjs/common';
import { InvitationCodesDatabaseModule } from 'src/databases/invitation-codes-database/invitation-codes-database.module';
import { UsersDatabaseModule } from 'src/databases/users-database/users-database.module';
import { HashModule } from 'src/services/hash/hash.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [InvitationCodesDatabaseModule, HashModule, UsersDatabaseModule],
  providers: [UserService]
})
export class UserModule {}
