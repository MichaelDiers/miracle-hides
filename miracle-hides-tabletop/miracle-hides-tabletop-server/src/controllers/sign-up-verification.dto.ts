import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export default class SignUpDto {
  @IsEmail()
  email: string;

  
  @IsString()
  @Length(3, 50)
  displayName: string;

  @IsUUID(4)
  code: string;
}
