import EmailDto from './base-dtos/email.dto';
import PasswordDto from './base-dtos/password.dto';
import VerificationCodeDto from './base-dtos/verification-code.dto';

export type UnautherizedEmailVerificationDto = EmailDto & PasswordDto & VerificationCodeDto;

export type AutherizedEmailVerificationDto = VerificationCodeDto;
