import { UserInvitation } from 'src/user-invitations-database/user-invitation.schema';
import IUserInvitation from './user-invitation.interface';

export default interface IUserInvitationDatabaseService {
  createAsync(userInvitation: UserInvitation): Promise<IUserInvitation>;

  deleteAsync(guid: string): Promise<boolean>;

  readAsync(guid: string): Promise<IUserInvitation>;

  readAllAsync(): Promise<IUserInvitation[]>;

  updateAsync({
    guid,
    isActive,
    creator,
  } : {
    guid: string,
    isActive: boolean,
    creator: string,
  }): Promise<boolean>;
}

export const USER_INVITATION_DATABASE_SERVICE = 'USER_INVITATION_DATABASE_SERVICE';
