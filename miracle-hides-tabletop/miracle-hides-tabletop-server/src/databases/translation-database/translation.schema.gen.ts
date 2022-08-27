/**
 * Do not edit generated files!
**/
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as translations from '../../types/translation.interface.gen';export type TranslationCommonDocument = TranslationCommon & Document;

@Schema()
export class TranslationCommon implements translations.ITranslationCommon {
	@Prop({ required: true })
	back: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	emailPlaceholder: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	namePlaceholder: string;
}

export const TranslationCommonSchema = SchemaFactory.createForClass(TranslationCommon);

export type TranslationDashboardDocument = TranslationDashboard & Document;

@Schema()
export class TranslationDashboard implements translations.ITranslationDashboard {
	@Prop({ required: true })
	headline: string;
}

export const TranslationDashboardSchema = SchemaFactory.createForClass(TranslationDashboard);

export type TranslationHomeDocument = TranslationHome & Document;

@Schema()
export class TranslationHome implements translations.ITranslationHome {
	@Prop({ required: true })
	headline: string;
}

export const TranslationHomeSchema = SchemaFactory.createForClass(TranslationHome);

export type TranslationHouseRulesDocument = TranslationHouseRules & Document;

@Schema()
export class TranslationHouseRules implements translations.ITranslationHouseRules {
	@Prop({ required: true })
	headline: string;
}

export const TranslationHouseRulesSchema = SchemaFactory.createForClass(TranslationHouseRules);

export type TranslationInvitationsDocument = TranslationInvitations & Document;

@Schema()
export class TranslationInvitations implements translations.ITranslationInvitations {
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

export const TranslationInvitationsSchema = SchemaFactory.createForClass(TranslationInvitations);

export type TranslationInvitationsCreateDocument = TranslationInvitationsCreate & Document;

@Schema()
export class TranslationInvitationsCreate implements translations.ITranslationInvitationsCreate {
	@Prop({ required: true })
	conflict: string;

	@Prop({ required: true })
	createAndDone: string;

	@Prop({ required: true })
	createAndNext: string;

	@Prop({ required: true })
	headline: string;

	@Prop({ required: true })
	unspecificError: string;
}

export const TranslationInvitationsCreateSchema = SchemaFactory.createForClass(TranslationInvitationsCreate);

export type TranslationLanguagesDocument = TranslationLanguages & Document;

@Schema()
export class TranslationLanguages implements translations.ITranslationLanguages {
	@Prop({ required: true })
	headline: string;
}

export const TranslationLanguagesSchema = SchemaFactory.createForClass(TranslationLanguages);

export type TranslationNavbarDocument = TranslationNavbar & Document;

@Schema()
export class TranslationNavbar implements translations.ITranslationNavbar {
	@Prop({ required: true })
	dashboard: string;

	@Prop({ required: true })
	home: string;

	@Prop({ required: true })
	houseRules: string;

	@Prop({ required: true })
	invitations: string;

	@Prop({ required: true })
	languages: string;

	@Prop({ required: true })
	signIn: string;

	@Prop({ required: true })
	signOut: string;

	@Prop({ required: true })
	signUp: string;
}

export const TranslationNavbarSchema = SchemaFactory.createForClass(TranslationNavbar);

export type TranslationSignInDocument = TranslationSignIn & Document;

@Schema()
export class TranslationSignIn implements translations.ITranslationSignIn {
	@Prop({ required: true })
	cannotSignIn: string;

	@Prop({ required: true })
	headline: string;

	@Prop({ required: true })
	unknownUser: string;
}

export const TranslationSignInSchema = SchemaFactory.createForClass(TranslationSignIn);

export type TranslationSignUpDocument = TranslationSignUp & Document;

@Schema()
export class TranslationSignUp implements translations.ITranslationSignUp {
	@Prop({ required: true })
	cannotSignUp: string;

	@Prop({ required: true })
	headline: string;

	@Prop({ required: true })
	userExists: string;
}

export const TranslationSignUpSchema = SchemaFactory.createForClass(TranslationSignUp);

export type TranslationUserFormDocument = TranslationUserForm & Document;

@Schema()
export class TranslationUserForm implements translations.ITranslationUserForm {
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

export const TranslationUserFormSchema = SchemaFactory.createForClass(TranslationUserForm);

export type TranslationValidationDocument = TranslationValidation & Document;

@Schema()
export class TranslationValidation implements translations.ITranslationValidation {
	@Prop({ required: true })
	invalidEmail: string;

	@Prop({ required: true })
	maxLength: string;

	@Prop({ required: true })
	maxLengthReplace: string;

	@Prop({ required: true })
	minLength: string;

	@Prop({ required: true })
	minLengthReplace: string;

	@Prop({ required: true })
	missingValue: string;

	@Prop({ required: true })
	passwordMismatch: string;
}

export const TranslationValidationSchema = SchemaFactory.createForClass(TranslationValidation);

export type TranslationDocument = Translation & Document;

@Schema()
export class Translation implements translations.ITranslation {
	@Prop({ required: true, type: TranslationCommon, _id: false })
	common: TranslationCommon;

	@Prop({ required: true, type: TranslationDashboard, _id: false })
	dashboard: TranslationDashboard;

	@Prop({ required: true, type: TranslationHome, _id: false })
	home: TranslationHome;

	@Prop({ required: true, type: TranslationHouseRules, _id: false })
	houseRules: TranslationHouseRules;

	@Prop({ required: true, type: TranslationInvitations, _id: false })
	invitations: TranslationInvitations;

	@Prop({ required: true, type: TranslationInvitationsCreate, _id: false })
	invitationsCreate: TranslationInvitationsCreate;

	@Prop({ required: true })
	language: string;

	@Prop({ required: true, type: TranslationLanguages, _id: false })
	languages: TranslationLanguages;

	@Prop({ required: true, type: TranslationNavbar, _id: false })
	navbar: TranslationNavbar;

	@Prop({ required: true, type: TranslationSignIn, _id: false })
	signIn: TranslationSignIn;

	@Prop({ required: true, type: TranslationSignUp, _id: false })
	signUp: TranslationSignUp;

	@Prop({ required: true, type: TranslationUserForm, _id: false })
	userForm: TranslationUserForm;

	@Prop({ required: true, type: TranslationValidation, _id: false })
	validation: TranslationValidation;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
