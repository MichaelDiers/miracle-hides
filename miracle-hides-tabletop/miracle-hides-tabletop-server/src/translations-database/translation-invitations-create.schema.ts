import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsInvitationsCreate from 'src/types/translations-invitations-create';

export type TranslationInvitationsCreateDocument = TranslationInvitationsCreate & Document;

@Schema()
export class TranslationInvitationsCreate implements ITranslationsInvitationsCreate {
  @Prop({ required: true })
  conflict: string;

  @Prop({ required: true })
  createAndDone: string;

  @Prop({ required: true })
  createAndNext: string;

  @Prop({ required: true })
  unspecificError: string;

  @Prop({ required: true })
  headline: string;
}

export const TranslationInvitationsCreateSchema =
  SchemaFactory.createForClass(TranslationInvitationsCreate);
