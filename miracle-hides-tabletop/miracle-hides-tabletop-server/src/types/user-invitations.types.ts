import { Schema } from 'mongoose';
import { DisplayNameDto, displayNameSchemaEntry, IDisplayName } from '../base-types/display-name';
import { entryInfoSchemaEntry, IEntryInfo } from '../base-types/entry-info';
import GuidDto, { guidSchemaEntry, IGuid } from '../base-types/guid';
import { IInvitationCode, invitationCodeSchemaEntry } from '../base-types/invitation-code';
import { IIsActive, IsActiveDto, isActiveSchemaEntry } from '../base-types/is-active';

export const UserInvitationSchema = new Schema({
  ...displayNameSchemaEntry(),
  ...entryInfoSchemaEntry(),
  ...guidSchemaEntry(),
  ...invitationCodeSchemaEntry(),
  ...isActiveSchemaEntry(),
});

export type IUserInvitationCreate = IDisplayName;

export type UserInvitationCreateDto = DisplayNameDto;

export type IUserInvitation =
  IDisplayName
  & IGuid
  & IInvitationCode
  & IIsActive;

export type IUserInvitationDatabase =
  IUserInvitation
  & IEntryInfo;

export type IUserInvitationUpdate = 
  IGuid
  & IIsActive;

export type UserInvitationUpdateDto = 
  GuidDto
  & IsActiveDto;

 export interface IUserInvitationDatabaseService {
  createAsync(userInvitation: IUserInvitation, userCreated: string): Promise<IUserInvitationDatabase>;
  deleteAsync(guid: string): Promise<boolean>;
  readAsync(guid: string): Promise<IUserInvitationDatabase>;
  readByInvitationCodeAsync(invitationCode: string): Promise<IUserInvitationDatabase>;
  readAllAsync(): Promise<IUserInvitationDatabase[]>;
  updateAsync(update: IUserInvitationUpdate, userUpdate: string): Promise<boolean>;
}

export interface IUserInvitationService {
  createAsync(userInvitation: IUserInvitationCreate, userCreated: string): Promise<IUserInvitation>;
  deleteAsync(guid: string): Promise<void>;
  readAsync(guid: string): Promise<IUserInvitation>;
  readByInvitationCodeAsync(invitationCode: string): Promise<IUserInvitation>;
  readAllAsync(): Promise<IUserInvitation[]>;
  updateAsync(update: IUserInvitationUpdate, userUpdate: string): Promise<void>;
}

export const USER_INVITATION = 'userinvitation';
export const USER_INVITATION_SERVICE = 'USER_INVITATION_SERVICE';
export const USER_INVITATION_DATABASE_SERVICE = 'USER_INVITATION_DATABASE_SERVICE';
