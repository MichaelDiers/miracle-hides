import { EmailDto } from 'src/base-types/email';
import { PasswordDto } from 'src/base-types/password';
import { VerificationCodeDto } from 'src/base-types/verification-code';


export type UnautherizedEmailVerificationDto = EmailDto & PasswordDto & VerificationCodeDto;

export type AutherizedEmailVerificationDto = VerificationCodeDto;
