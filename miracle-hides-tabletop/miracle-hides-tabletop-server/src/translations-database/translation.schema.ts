import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import translationsCommon from 'src/types/translations-common';
import translationsInvitationsCreate from 'src/types/translations-invitations-create';
import ITranslationsNavbar from 'src/types/translations-navbar.interface';
import ITranslations from 'src/types/translations.interface';
import { TranslationCommon, TranslationCommonSchema } from './translation-common.schema';
import {
  TranslationDashboard,
  TranslationDashboardSchema,
} from './translation-dashboard.schema';
import {
  TranslationHome,
  TranslationHomeSchema,
} from './translation-home.schema';
import {
  TranslationHouseRules,
  TranslationHouseRulesSchema,
} from './translation-house-rules.schema';
import { TranslationInvitationsCreateSchema } from './translation-invitations-create.schema';
import {
  TranslationInvitations,
  TranslationInvitationsSchema,
} from './translation-invitations.schema';
import {
  TranslationLanguages,
  TranslationLanguagesSchema,
} from './translation-languages.schema';
import { TranslationNavbarSchema } from './translation-navbar.schema';
import {
  TranslationSignIn,
  TranslationSignInSchema,
} from './translation-sign-in.schema';
import {
  TranslationSignUp,
  TranslationSignUpSchema,
} from './translation-sign-up.schema';
import {
  TranslationUserForm,
  TranslationUserFormSchema,
} from './translation-user-form.schema';
import { TranslationValidation, TranslationValidationSchema } from './translation-validation.schema';

export type TranslationDocument = Translation & Document;

@Schema()
export class Translation implements ITranslations {
  @Prop({ required: true, type: TranslationCommonSchema, _id: false })
  common: TranslationCommon;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true, type: TranslationDashboardSchema, _id: false })
  dashboard: TranslationDashboard;

  @Prop({ required: true, type: TranslationHomeSchema, _id: false })
  home: TranslationHome;

  @Prop({ required: true, type: TranslationInvitationsSchema, _id: false })
  invitations: TranslationInvitations;

  @Prop({ required: true, type: TranslationInvitationsCreateSchema, _id: false })
  invitationsCreate: translationsInvitationsCreate;

  @Prop({ required: true, type: TranslationNavbarSchema, _id: false })
  navbar: ITranslationsNavbar;

  @Prop({ required: true, type: TranslationHouseRulesSchema, _id: false })
  houseRules: TranslationHouseRules;

  @Prop({ required: true, type: TranslationLanguagesSchema, _id: false })
  languages: TranslationLanguages;

  @Prop({ required: true, type: TranslationSignInSchema, _id: false })
  signIn: TranslationSignIn;

  @Prop({ required: true, type: TranslationSignUpSchema, _id: false })
  signUp: TranslationSignUp;

  @Prop({ required: true, type: TranslationUserFormSchema, _id: false })
  userForm: TranslationUserForm;

  @Prop({ required: true, type: TranslationValidationSchema, _id: false })
  validation: TranslationValidation;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
