import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    Length,
} from 'class-validator';
import { constants } from '../../constants';

export class CreateDto {
  @IsEmail()
  @Length(constants.EMAIL_MIN_LENGTH, constants.EMAIL_MAX_LENGTH)
  @IsNotEmpty()
  public email: string;

  @IsUUID(4)
  @IsNotEmpty()
  public code: string;
  
  @IsString()
  @Length(constants.PASSWORD_MIN_LENGTH, constants.PASSWORD_MAX_LENGTH)
  @IsNotEmpty()
  public password: string;
}
