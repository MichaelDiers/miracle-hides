import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import IUserInvitation from 'src/types/user-invitation.interface';

export type UserInvitationDocument = UserInvitation & Document;

const guid = {
  guid: { required: true, type: String, unique: true }
}

const code = {
  code: { required: true, type: String, unique: true }
}

const name = {
  name: { required: true, type: String, unique: true }
}

const creator = {
  creator: { required: true, type: String, unique: true }
}

const created = {
  created: { required: true, type: String, unique: true }
}

const isActive = {
  isActive: { required: true, type: Boolean, unique: true }
}

const schemax = new mongoose.Schema({
  ...guid,
  ...code,
  ...name,
  ...isActive,
  ...creator,
  ...created,
});

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

export const UserInvitationSchema = schemax; // SchemaFactory.createForClass(UserInvitation);
