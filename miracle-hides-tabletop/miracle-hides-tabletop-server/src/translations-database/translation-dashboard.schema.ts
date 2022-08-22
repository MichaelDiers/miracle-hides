import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsDashboard from 'src/types/translations-dashboard.interface';

export type TranslationDashboardDocument = TranslationDashboard & Document;

@Schema({ id: false })
export class TranslationDashboard implements ITranslationsDashboard {
  @Prop({ required: true })
  headline: string;
}

export const TranslationDashboardSchema =
  SchemaFactory.createForClass(TranslationDashboard);
