import {
  IsIn, IsNotEmpty, IsNumberString, IsString, ValidateIf,
} from 'class-validator';

export default class CreateKeysRequestDto {
  @ValidateIf(obj => obj.type === 'AES')
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['128', '192', '256'])
  aesKeySize: string;

  @ValidateIf(obj => obj.type === 'RSA')
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['1024', '2048', '4096'])
  keySize: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['AES', 'RSA'])
  type: string;
}
