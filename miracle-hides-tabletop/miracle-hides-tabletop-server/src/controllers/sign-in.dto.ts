import { IsEmail, IsString, Length } from 'class-validator';

export default class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 256)
  password: string;
}
