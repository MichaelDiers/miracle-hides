import { Schema } from 'mongoose';
import { DisplayNameDto, displayNameSchemaEntry, IDisplayName } from '../base-types/display-name';
import IEmail, { EmailDto, emailSchemaEntry } from '../base-types/email';
import { entryInfoSchemaEntry, IEntryInfo } from '../base-types/entry-info';
import GuidDto, { guidSchemaEntry, IGuid } from '../base-types/guid';
import { IInvitationCode, InvitationCodeDto, invitationCodeSchemaEntry } from '../base-types/invitation-code';
import IsEmailVerifiedDto, { IIsEmailVerified, isEmailVerifiedSchemaEntry } from '../base-types/is-email-verified';
import { ILanguageInternalName, LanguageInternalNameDto, languageInternalNameSchemaEntry } from '../base-types/language-internal-name';
import { IPassword, PasswordDto, passwordSchemaEntry } from '../base-types/password';
import { IDatabaseRoles, IRoles, RolesDto, rolesSchemaEntry } from '../base-types/roles';
import { IToken } from '../base-types/token';
import { IVerificationCode, VerificationCodeDto, verificationCodeSchemaEntry } from '../base-types/verification-code';
import { ITransaction } from './transaction.types';
import { intersectionHelper2, intersectionHelper3, intersectionHelper4, intersectionHelper5 } from '../base-types/intersection-helper.gen';

// used for di
export const USER_SERVICE = 'USER_SERVICE';

// used for di
export const USER_DATABASE_SERVICE = 'USER_DATABASE_SERVICE';

// used for di and specifies the collection name
export const USER = 'user';

export type IUser =
  IDisplayName
  & IEmail
  & IGuid
  & IInvitationCode  
  & IIsEmailVerified
  & ILanguageInternalName
  & IPassword
  & IRoles
  & IVerificationCode;

export type IDatabaseUser =
  IDisplayName
  & IEmail
  & IGuid
  & IInvitationCode  
  & IIsEmailVerified
  & ILanguageInternalName
  & IPassword
  & IDatabaseRoles
  & IVerificationCode
  & IEntryInfo;  

export type IUserEmailVerification =
  IEmail
  & IPassword
  & IVerificationCode;

export class UserEmailVerificationDto extends intersectionHelper3(
  EmailDto,
  PasswordDto,
  VerificationCodeDto,
) {}

export type IUserEmailVerificationWithPayload =
  IJwtPayload
  & IVerificationCode;

export type IUserFrontEnd =
  IDisplayName
  & IGuid
  & IInvitationCode  
  & IIsEmailVerified
  & ILanguageInternalName
  & IRoles
  & IVerificationCode;

export type IUserSignIn = 
  IEmail
  & IPassword;

export class UserSignInDto extends intersectionHelper2(
  EmailDto,
  PasswordDto,
) {}

export type IUserSignUp = 
  IDisplayName
  & IEmail
  & IInvitationCode
  & ILanguageInternalName
  & IPassword;

export class UserSignUpDto extends intersectionHelper5(
  DisplayNameDto,
  EmailDto,
  InvitationCodeDto,
  LanguageInternalNameDto,
  PasswordDto,
) {}

export type IUserUpdate =
  IDisplayName
  & IGuid
  & IIsEmailVerified
  & IRoles;

export class UserUpdateDto extends intersectionHelper4(
  DisplayNameDto,
  GuidDto,
  IsEmailVerifiedDto,
  RolesDto,
) {}

export type IJwtPayload = 
  IDisplayName
  & IGuid
  & IRoles
  & IIsEmailVerified;

export type ITokenResponse = IToken;

export const UserSchema = new Schema({
  ...displayNameSchemaEntry(),
  ...emailSchemaEntry(),
  ...entryInfoSchemaEntry(),
  ...guidSchemaEntry(),
  ...invitationCodeSchemaEntry(),
  ...isEmailVerifiedSchemaEntry(),
  ...languageInternalNameSchemaEntry(),
  ...passwordSchemaEntry(),
  ...rolesSchemaEntry(),
  ...verificationCodeSchemaEntry(),  
});

export interface IUserDatabaseService {
  createAsync(user: IUser, transaction?: ITransaction): Promise<IDatabaseUser>;

  deleteAsync(guid: string): Promise<boolean>;

  findOneAsync(predicate: ((user: IDatabaseUser) => Promise<boolean>)|string): Promise<IDatabaseUser>;

  readAllAsync(): Promise<IDatabaseUser[]>;

  updateAsync(user: IUserUpdate, updateUser: string): Promise<boolean>;
}

export interface IUserService {
  createAsync(user: IUserSignUp): Promise<ITokenResponse>;
  deleteAsync(guid: string): Promise<void>;
  readAsync(guid: string): Promise<IUserFrontEnd>;
  readAllAsync(): Promise<IUserFrontEnd[]>;
  signInAsync(user: IUserSignIn): Promise<ITokenResponse>;
  updateAsync(userUpdate: IUserUpdate, updateUser: string): Promise<void>;
  verifyEmail(user: IUserEmailVerification | IUserEmailVerificationWithPayload): Promise<ITokenResponse>;
}

