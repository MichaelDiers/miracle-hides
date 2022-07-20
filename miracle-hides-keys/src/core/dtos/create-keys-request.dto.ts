import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import {
  ALGORITHM_AES,
  ALGORITHM_EC,
  ALGORITHM_HMAC,
  ALGORITHM_RSA,
  SUPPORTED_ALGORITHMS,
} from '../interfaces/data/data-constants';

export default class CreateKeysRequestDto {
  @ValidateIf((obj) => obj.type === ALGORITHM_AES)
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['128', '192', '256'])
    aesKeySize: string;

  @ValidateIf((obj) => obj.type === ALGORITHM_EC)
  @IsNotEmpty()
  @IsString()
  @IsIn(['sect239k1'])
    ecNamedCurve: string;

  @ValidateIf((obj) => obj.type === ALGORITHM_HMAC)
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
    hmacKeySize: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
    testInput?: string;

  @ValidateIf((obj) => obj.type === ALGORITHM_RSA)
  @IsNotEmpty()
  @IsNumberString()
  @IsIn(['1024', '2048', '4096'])
    rsaKeySize: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(SUPPORTED_ALGORITHMS.map((algorithm) => algorithm.toUpperCase()))
    type: string;
}
