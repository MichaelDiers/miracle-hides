import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Length(4, 100)
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  public displayName: string;

  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  public password: string;
}
