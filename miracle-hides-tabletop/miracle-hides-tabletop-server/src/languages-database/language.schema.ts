import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema()
export class Language {
  @Prop({ required: true })
  short: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isDefault: boolean;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
