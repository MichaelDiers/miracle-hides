import { IDisplayName } from '../base-types/display-name';
import IEmail from '../base-types/email';
import { IGuid } from '../base-types/guid';
import { IInvitationCode } from '../base-types/invitation-code';
import { IIsEmailVerified } from '../base-types/is-email-verified';
import { ILanguageInternalName } from '../base-types/language-internal-name';
import { IPassword } from '../base-types/password';
import { IRoles } from '../base-types/roles';
import { IToken } from '../base-types/token';
import { IVerificationCode } from '../base-types/verification-code';

export type IUserEmailVerification =
  IEmail
  & IPassword
  & IVerificationCode;

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

export type IUserSignUp = 
  IDisplayName
  & IEmail
  & IInvitationCode
  & ILanguageInternalName
  & IPassword;

export type IUserUpdate =
  IDisplayName
  & IGuid
  & IIsEmailVerified
  & IRoles;

export type IJwtPayload = 
  IDisplayName
  & IGuid
  & IRoles
  & IIsEmailVerified;

export type ITokenResponse = IToken;

export type ICurrentUser =
  IDisplayName
  & IGuid
  & IRoles
  & IIsEmailVerified
  & IToken;
