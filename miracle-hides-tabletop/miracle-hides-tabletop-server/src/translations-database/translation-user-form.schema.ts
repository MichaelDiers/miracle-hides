import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsUserForm from 'src/types/translations-user-form.interface';

export type TranslationUserFormDocument = TranslationUserForm & Document;

@Schema()
export class TranslationUserForm implements ITranslationsUserForm {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  invitationCode: string;
  
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  passwordRepetition: string;

  @Prop({ required: true })
  signInSubmit: string;

  @Prop({ required: true })
  signUpSubmit: string;
}

export const TranslationUserFormSchema =
  SchemaFactory.createForClass(TranslationUserForm);
