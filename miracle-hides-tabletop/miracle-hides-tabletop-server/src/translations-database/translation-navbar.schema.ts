import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsNavbar from 'src/types/translations-navbar.interface';

export type TranslationNavbarDocument = TranslationNavbar & Document;

@Schema()
export class TranslationNavbar implements ITranslationsNavbar {
  @Prop({ required: true })
  home: string;

  @Prop({ required: true })
  houseRules: string;

  @Prop({ required: true })
  languages: string;
}

export const TranslationNavbarSchema = SchemaFactory.createForClass(TranslationNavbar);
