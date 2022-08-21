import { IsString, Length } from 'class-validator';
import SignInDto from './sign-in.dto';

export default class SignUpDto extends SignInDto {
  @IsString()
  @Length(3, 50)
  displayName: string;
}
