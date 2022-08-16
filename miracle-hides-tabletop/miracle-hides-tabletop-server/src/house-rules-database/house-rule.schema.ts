import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HouseRuleDocument = HouseRule & Document;

@Schema()
export class HouseRule {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true, type: [String] })
  descriptions: string[];
}

export const HouseRuleSchema = SchemaFactory.createForClass(HouseRule);
