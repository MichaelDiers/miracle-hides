import { IDisplayName } from '../base-types/display-name';
import { IGuid } from '../base-types/guid';
import { IInvitationCode } from '../base-types/invitation-code';
import { IIsActive } from '../base-types/is-active';

export type IUserInvitationCreate = IDisplayName;

export type IUserInvitation =
  IDisplayName
  & IGuid
  & IInvitationCode
  & IIsActive;

export type IUserInvitationUpdate = 
  IGuid
  & IIsActive;
