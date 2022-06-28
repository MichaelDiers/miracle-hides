import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { constants } from '../../constants';

export class VerifyEmailDto {
  @IsEmail()
  @Length(constants.EMAIL_MIN_LENGTH, constants.EMAIL_MAX_LENGTH)
  @IsNotEmpty()
  public email: string;

  @IsUUID(4)
  @IsNotEmpty()
  public verificationCode: string;
  
  @IsString()
  @Length(constants.PASSWORD_MIN_LENGTH, constants.PASSWORD_MAX_LENGTH)
  @IsNotEmpty()
  public password: string;
}
