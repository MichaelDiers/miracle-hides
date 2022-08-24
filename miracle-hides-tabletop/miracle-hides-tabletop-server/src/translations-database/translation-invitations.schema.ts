import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsInvitations from 'src/types/translations-invitations';

export type TranslationInvitationsDocument = TranslationInvitations & Document;

@Schema()
export class TranslationInvitations implements ITranslationsInvitations {
  @Prop({ required: true })
  active: string;

  @Prop({ required: true })
  create: string;

  @Prop({ required: true })
  delete: string;

  @Prop({ required: true })
  headline: string;
  
  @Prop({ required: true })
  notFound: string;

  @Prop({ required: true })
  toggleToActive: string;

  @Prop({ required: true })
  toggleToInactive: string;
  
  @Prop({ required: true })
  unspecificError: string;

  @Prop({ required: true })
  used: string;
}

export const TranslationInvitationsSchema =
  SchemaFactory.createForClass(TranslationInvitations);
