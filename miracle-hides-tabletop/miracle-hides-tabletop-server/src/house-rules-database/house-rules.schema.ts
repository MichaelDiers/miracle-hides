import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import HouseRuleDto from './house-rule.dto';
import { HouseRuleSchema } from './house-rule.schema';

export type HouseRulesDocument = HouseRules & Document;

@Schema({ collection: 'house-rules' })
export class HouseRules {
  @Prop({ required: true })
  headline: string;

  @Prop({ required: true, type: [HouseRuleSchema] })
  houseRules: HouseRuleDto[];

  @Prop({ required: true })
  language: string;
}

export const HouseRulesSchema = SchemaFactory.createForClass(HouseRules);
