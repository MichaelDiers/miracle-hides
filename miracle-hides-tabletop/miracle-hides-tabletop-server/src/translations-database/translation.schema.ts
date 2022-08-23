import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ITranslationsNavbar from 'src/types/translations-navbar.interface';
import ITranslations from 'src/types/translations.interface';
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
  @Prop({ required: true })
  language: string;

  @Prop({ required: true, type: TranslationDashboardSchema })
  dashboard: TranslationDashboard;

  @Prop({ required: true, type: TranslationHomeSchema })
  home: TranslationHome;

  @Prop({ required: true, type: TranslationInvitationsSchema })
  invitations: TranslationInvitations;

  @Prop({ required: true, type: TranslationNavbarSchema })
  navbar: ITranslationsNavbar;

  @Prop({ required: true, type: TranslationHouseRulesSchema })
  houseRules: TranslationHouseRules;

  @Prop({ required: true, type: TranslationLanguagesSchema })
  languages: TranslationLanguages;

  @Prop({ required: true, type: TranslationSignInSchema })
  signIn: TranslationSignIn;

  @Prop({ required: true, type: TranslationSignUpSchema })
  signUp: TranslationSignUp;

  @Prop({ required: true, type: TranslationUserFormSchema })
  userForm: TranslationUserForm;

  @Prop({ required: true, type: TranslationValidationSchema })
  validation: TranslationValidation;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
