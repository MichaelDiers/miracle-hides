import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_INVITATION_DATABASE_SERVICE } from 'src/types/user-invitation-database-service.interface';
import { UserInvitation, UserInvitationSchema } from './user-invitation.schema';
import { UserInvitationsDatabaseService } from './user-invitations-database.service';

@Module({
  exports: [USER_INVITATION_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: UserInvitation.name, schema: UserInvitationSchema },
    ]),
  ],
  providers: [
    {
      provide: USER_INVITATION_DATABASE_SERVICE,
      useClass: UserInvitationsDatabaseService,
    },
  ],
})
export class UserInvitationsDatabaseModule {}
