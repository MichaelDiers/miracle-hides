/**
 * Do not edit generated files!
**/
export interface ITranslationCommon {
	back: string;
	email: string;
	emailPlaceholder: string;
	name: string;
	namePlaceholder: string;
}

export interface ITranslationDashboard {
	headline: string;
}

export interface ITranslationHome {
	headline: string;
}

export interface ITranslationHouseRules {
	headline: string;
}

export interface ITranslationInvitations {
	active: string;
	create: string;
	delete: string;
	headline: string;
	notFound: string;
	toggleToActive: string;
	toggleToInactive: string;
	unspecificError: string;
	used: string;
}

export interface ITranslationInvitationsCreate {
	conflict: string;
	createAndDone: string;
	createAndNext: string;
	headline: string;
	unspecificError: string;
}

export interface ITranslationLanguages {
	headline: string;
}

export interface ITranslationNavbar {
	dashboard: string;
	home: string;
	houseRules: string;
	invitations: string;
	languages: string;
	signIn: string;
	signOut: string;
	signUp: string;
}

export interface ITranslationSignIn {
	cannotSignIn: string;
	headline: string;
	unknownUser: string;
}

export interface ITranslationSignUp {
	cannotSignUp: string;
	headline: string;
	userExists: string;
}

export interface ITranslationUserForm {
	displayName: string;
	email: string;
	invitationCode: string;
	password: string;
	passwordRepetition: string;
	signInSubmit: string;
	signUpSubmit: string;
}

export interface ITranslationValidation {
	invalidEmail: string;
	maxLength: string;
	maxLengthReplace: string;
	minLength: string;
	minLengthReplace: string;
	missingValue: string;
	passwordMismatch: string;
}

export interface ITranslation {
	common: ITranslationCommon;
	dashboard: ITranslationDashboard;
	home: ITranslationHome;
	houseRules: ITranslationHouseRules;
	invitations: ITranslationInvitations;
	invitationsCreate: ITranslationInvitationsCreate;
	language: string;
	languages: ITranslationLanguages;
	navbar: ITranslationNavbar;
	signIn: ITranslationSignIn;
	signUp: ITranslationSignUp;
	userForm: ITranslationUserForm;
	validation: ITranslationValidation;
}
