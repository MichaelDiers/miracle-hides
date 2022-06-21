import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEntityDocument = UserEntity & Document;

@Schema({ collection: 'users' })
export class UserEntity {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  forcePasswordChange: boolean;

  @Prop({ required: true })
  isLocked: boolean;

  @Prop()
  lockedReason: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  signInAttemptFailures: number;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  verificationCode: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
