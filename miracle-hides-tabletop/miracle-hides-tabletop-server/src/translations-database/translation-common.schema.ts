import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsCommon from 'src/types/translations-common';


export type TranslationCommonDocument = TranslationCommon & Document;

@Schema()
export class TranslationCommon implements ITranslationsCommon {
  @Prop({ required: true })
  back: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  emailPlaceholder: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  namePlaceholder: string;
}

export const TranslationCommonSchema =
  SchemaFactory.createForClass(TranslationCommon);
