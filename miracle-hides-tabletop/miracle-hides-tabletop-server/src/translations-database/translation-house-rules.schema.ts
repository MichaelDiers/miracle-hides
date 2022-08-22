import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsHouseRules from 'src/types/translations-house-rules.interface';

export type TranslationHouseRulesDocument = TranslationHouseRules & Document;

@Schema({ id: false })
export class TranslationHouseRules implements ITranslationsHouseRules {
  @Prop({ required: true })
  headline: string;
}

export const TranslationHouseRulesSchema = SchemaFactory.createForClass(
  TranslationHouseRules,
);
