import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsValidation from 'src/types/translations-validation';

export type TranslationValidationDocument = TranslationValidation & Document;

@Schema()
export class TranslationValidation implements ITranslationsValidation {
  @Prop({ required: true })
  invalidEmail: string;

  @Prop({ required: true })
  maxLength: string;

  @Prop({ required: true })
  maxLengthReplace: string;

  @Prop({ required: true })
  minLength: string;

  @Prop({ required: true })
  minLengthReplace: string;

  @Prop({ required: true })
  missingValue: string;

  @Prop({ required: true })
  passwordMismatch: string;
}

export const TranslationValidationSchema =
  SchemaFactory.createForClass(TranslationValidation);
