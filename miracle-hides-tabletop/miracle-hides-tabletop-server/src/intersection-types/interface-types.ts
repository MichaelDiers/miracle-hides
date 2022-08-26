import IEmail from 'src/base-types/email';
import { IPassword } from 'src/base-types/password';
import { IVerificationCode } from 'src/base-types/verification-code';

export type IUnautherizedEmailVerification = IEmail & IPassword & IVerificationCode;

export type IAutherizedEmailVerification = IVerificationCode;
