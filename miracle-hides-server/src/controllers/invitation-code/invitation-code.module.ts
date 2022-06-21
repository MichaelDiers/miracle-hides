import { Module } from '@nestjs/common';
import { InvitationCodesDatabaseModule } from 'src/databases/invitation-codes-database/invitation-codes-database.module';
import { HashModule } from 'src/services/hash/hash.module';
import { InvitationCodeController } from './invitation-code.controller';
import { InvitationCodeService } from './invitation-code.service';

@Module({
  controllers: [InvitationCodeController],
  imports: [InvitationCodesDatabaseModule, HashModule],
  providers: [InvitationCodeService]
})
export class InvitationCodeModule {}
