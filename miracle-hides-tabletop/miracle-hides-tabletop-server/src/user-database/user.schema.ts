import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ISignUpData from 'src/types/sign-up-data.interface';

export type UserDocument = User & Document;

@Schema({ autoIndex: true })
export class User implements ISignUpData {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  guid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: UserRoles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ displayName: 1}, { unique: true });
