import { IsNotIn, IsString, Length } from 'class-validator';

export default class PasswordDto {
  @IsString()
  @Length(8, 256)
  @IsNotIn(['password', 'PASSWORD', '12345678', '87654321'])
  password: string;
}
