import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsInvitations from 'src/types/translations-invitations';

export type TranslationInvitationsDocument = TranslationInvitations & Document;

@Schema({ id: false })
export class TranslationInvitations implements ITranslationsInvitations {
  @Prop({ required: true })
  headline: string;
}

export const TranslationInvitationsSchema =
  SchemaFactory.createForClass(TranslationInvitations);
