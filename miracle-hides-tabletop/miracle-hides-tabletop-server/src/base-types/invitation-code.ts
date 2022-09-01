import { IsUUID } from 'class-validator';
import { guidSchemaEntry } from './guid';

export const invitationCodeSchemaEntry = () => guidSchemaEntry('invitationCode');

export interface IInvitationCode {
  invitationCode: string;
}

export class InvitationCodeDto implements IInvitationCode {
  @IsUUID(4)
  invitationCode: string;
}
