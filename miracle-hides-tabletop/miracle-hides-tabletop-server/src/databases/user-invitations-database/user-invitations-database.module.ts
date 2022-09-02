import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInvitationsDatabaseService } from './user-invitations-database.service';
import * as userInvitationTypes from '../../types/user-invitations.types';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  exports: [userInvitationTypes.USER_INVITATION_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      {
        name: userInvitationTypes.USER_INVITATION,
        schema: userInvitationTypes.UserInvitationSchema,
      },
    ]),
    LoggingModule,
  ],
  providers: [
    {
      provide: userInvitationTypes.USER_INVITATION_DATABASE_SERVICE,
      useClass: UserInvitationsDatabaseService,
    },
  ],
})
export class UserInvitationsDatabaseModule {}
