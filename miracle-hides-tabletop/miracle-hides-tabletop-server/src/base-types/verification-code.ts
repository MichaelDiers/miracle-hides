import { IsUUID } from 'class-validator';
import { guidSchemaEntry } from './guid';

export const verificationCodeSchemaEntry = () => guidSchemaEntry('verificationCode');

export interface IVerificationCode {
  verificationCode: string;
}

export class VerificationCodeDto implements IVerificationCode {
  @IsUUID(4)
  verificationCode: string;
}
