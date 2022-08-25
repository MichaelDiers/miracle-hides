import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ISignUpData from 'src/types/sign-up-data.interface';
import UserRoles from 'src/types/user-roles';

export type UserDocument = User & Document;

@Schema({ autoIndex: true })
export class User implements ISignUpData {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true, unique: true })
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  emailIsVerified: boolean;

  @Prop({ required: true })
  guid: string;

  @Prop({ required: true })
  isVerified: boolean;

  @Prop({ required: false })
  language: string;
  
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: UserRoles[];

  @Prop({ required: true })
  verification: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
