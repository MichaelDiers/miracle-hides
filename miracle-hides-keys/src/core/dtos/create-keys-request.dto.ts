import {
  IsIn, IsNotEmpty, IsNumberString, IsString, ValidateIf,
} from 'class-validator';

export default class CreateKeysRequestDto {
  @ValidateIf((obj) => obj.type === 'AES')
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['128', '192', '256'])
    aesKeySize: string;

    @ValidateIf((obj) => obj.type === 'EC')
    @IsNotEmpty()
    @IsString()
    @IsIn(['sect239k1'])
      ecNamedCurve: string;

  @ValidateIf((obj) => obj.type === 'RSA')
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['1024', '2048', '4096'])
    rsaKeySize: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['AES', 'EC', 'RSA'])
    type: string;
}
