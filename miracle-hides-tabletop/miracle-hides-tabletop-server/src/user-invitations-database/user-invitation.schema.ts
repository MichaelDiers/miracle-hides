import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import IUserInvitation from 'src/types/user-invitation.interface';

export type UserInvitationDocument = UserInvitation & Document;

@Schema()
export class UserInvitation implements IUserInvitation {
  @Prop({ required: true, unique: true })
  guid: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  created: string;
}

export const UserInvitationSchema = SchemaFactory.createForClass(UserInvitation);
