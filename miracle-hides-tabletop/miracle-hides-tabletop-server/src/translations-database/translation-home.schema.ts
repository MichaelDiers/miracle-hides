import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsHome from 'src/types/translations-home.interface';

export type TranslationHomeDocument = TranslationHome & Document;

@Schema()
export class TranslationHome implements ITranslationsHome {
  @Prop({ required: true })
  headline: string;
}

export const TranslationHomeSchema = SchemaFactory.createForClass(TranslationHome);
