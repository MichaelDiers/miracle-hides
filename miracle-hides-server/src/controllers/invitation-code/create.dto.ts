import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { constants } from '../../constants';

export class CreateDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(constants.EMAIL_MIN_LENGTH, constants.EMAIL_MAX_LENGTH)
  public email: string;
}
