import IEmail from './simple-types/email.interface';
import IPassword from './simple-types/password.interface';
import IVerificationCode from './simple-types/verification-code.dto';

export type IUnautherizedEmailVerification = IEmail & IPassword & IVerificationCode;

export type IAutherizedEmailVerification = IVerificationCode;
