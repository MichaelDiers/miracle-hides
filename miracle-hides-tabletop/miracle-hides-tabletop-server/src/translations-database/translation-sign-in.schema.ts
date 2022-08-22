import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsSignIn from 'src/types/translations-sign-in.interface';

export type TranslationSignInDocument = TranslationSignIn & Document;

@Schema({ id: false })
export class TranslationSignIn implements ITranslationsSignIn {
  @Prop({ required: true })
  cannotSignIn: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  unknownUser: string;
}

export const TranslationSignInSchema =
  SchemaFactory.createForClass(TranslationSignIn);
