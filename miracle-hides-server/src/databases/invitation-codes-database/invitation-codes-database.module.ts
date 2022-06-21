import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/services/config/config.module';
import { InvitationCodesDatabaseService } from './invitation-codes-database.service';

@Module({
  exports: [InvitationCodesDatabaseService],
  imports: [ConfigModule],
  providers: [InvitationCodesDatabaseService]
})
export class InvitationCodesDatabaseModule {}
