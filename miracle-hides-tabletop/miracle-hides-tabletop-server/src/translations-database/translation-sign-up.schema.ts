import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsSignUp from 'src/types/translations-sign-up.interface';

export type TranslationSignUpDocument = TranslationSignUp & Document;

@Schema()
export class TranslationSignUp implements ITranslationsSignUp {
  @Prop({ required: true })
  headline: string;
}

export const TranslationSignUpSchema =
  SchemaFactory.createForClass(TranslationSignUp);
