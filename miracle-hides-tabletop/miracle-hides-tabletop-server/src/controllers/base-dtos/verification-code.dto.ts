import { IsUUID } from 'class-validator';

export default class VerificationCodeDto {
  @IsUUID(4)
  verificationCode: string;
}
