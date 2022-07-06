import {
  IsIn, IsNotEmpty, IsNumberString, IsString,
} from 'class-validator';

export default class CreateKeysRequestDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['1024', '2048', '4096'])
    keySize: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['RSA'])
    type: string;
}
