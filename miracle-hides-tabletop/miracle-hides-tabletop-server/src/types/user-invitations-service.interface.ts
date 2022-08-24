import IUserInvitation from 'src/types/user-invitation.interface';

export default interface IUserInvitationsService {
  createAsync({
    creator,
    email,
    name,
  } : {
    creator: string,
    email?: string,
    name: string,
  }): Promise<IUserInvitation>;

  deleteAsync(guid: string): Promise<void>;

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
  }): Promise<void>;
}

export const USER_INVITATION_SERVICE = 'USER_INVITATION_SERVICE';
