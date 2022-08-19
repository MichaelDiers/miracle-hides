import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsNavbar from 'src/types/translations-navbar.interface';
import ITranslations from 'src/types/translations.interface';
import { TranslationHome, TranslationHomeSchema } from './translation-home.schema';
import { TranslationHouseRules, TranslationHouseRulesSchema } from './translation-house-rules.schema';
import { TranslationLanguages, TranslationLanguagesSchema } from './translation-languages.schema';
import { TranslationNavbarSchema } from './translation-navbar.schema';

export type TranslationDocument = Translation & Document;

@Schema()
export class Translation implements ITranslations {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true, type: TranslationHomeSchema })
  home: TranslationHome;

  @Prop({ required: true, type: TranslationNavbarSchema })
  navbar: ITranslationsNavbar;

  @Prop({ required: true, type: TranslationHouseRulesSchema })
  houseRules: TranslationHouseRules;

  @Prop({ required: true, type: TranslationLanguagesSchema })
  languages: TranslationLanguages;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
