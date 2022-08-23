import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsNavbar from 'src/types/translations-navbar.interface';

export type TranslationNavbarDocument = TranslationNavbar & Document;

@Schema({ id: false })
export class TranslationNavbar implements ITranslationsNavbar {
  @Prop({ required: true })
  dashboard: string;

  @Prop({ required: true })
  home: string;

  @Prop({ required: true })
  houseRules: string;

  @Prop({ required: true })
  invitations: string;

  @Prop({ required: true })
  languages: string;

  @Prop({ required: true })
  signIn: string;

  @Prop({ required: true })
  signUp: string;

  @Prop({ required: true })
  signOut: string;
}

export const TranslationNavbarSchema =
  SchemaFactory.createForClass(TranslationNavbar);
