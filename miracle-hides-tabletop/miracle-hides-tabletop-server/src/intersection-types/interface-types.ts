import IEmail from '../base-types/email';
import { IPassword } from '../base-types/password';
import { IVerificationCode } from '../base-types/verification-code';

export type IUnautherizedEmailVerification = IEmail & IPassword & IVerificationCode;

export type IAutherizedEmailVerification = IVerificationCode;
