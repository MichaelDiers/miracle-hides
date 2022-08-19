import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsLanguages from 'src/types/translations-languages.interface';

export type TranslationLanguagesDocument = TranslationLanguages & Document;

@Schema()
export class TranslationLanguages implements ITranslationsLanguages {
  @Prop({ required: true })
  headline: string;
}

export const TranslationLanguagesSchema = SchemaFactory.createForClass(TranslationLanguages);
