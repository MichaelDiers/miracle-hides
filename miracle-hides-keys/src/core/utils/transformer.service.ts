import { BadRequestException, Injectable } from '@nestjs/common';
import CreateKeysRequestDto from '../dtos/create-keys-request.dto';
import CreateKeysResponseDto from '../dtos/create-keys-response.dto';
import { KeyOptions, KeysResult } from '../interfaces/data/data';
import { ALGORITHM_AES, ALGORITHM_EC, ALGORITHM_RSA } from '../interfaces/data/data-constants';
import { AesKeySize, EcNamedCurve, EcNamedCurveSect239k1, RsaKeySize, SupportedAlgorithms } from '../interfaces/data/data-types';
import { Transformer } from '../interfaces/services/services';

@Injectable()
export default class TransformerService implements Transformer {
  // eslint-disable-next-line class-methods-use-this
  createKeysRequestDtoToKeyOptions(
    createKeysRequestDto: CreateKeysRequestDto,
  ): KeyOptions {
    const type = TransformerService.stringToAlgorithmName(createKeysRequestDto.type);
    const aesKeySize = TransformerService.aesKeySize(type, createKeysRequestDto.aesKeySize);
    const ecNamedCurve = TransformerService.ecNamedCurve(type, createKeysRequestDto.ecNamedCurve);
    const rsaKeySize = TransformerService.rsaKeySize(type, createKeysRequestDto.rsaKeySize);

    return {
      aesKeySize,
      ecNamedCurve,
      rsaKeySize,
      type,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  keysResultToCreateKeysResponseDto(
    keysResult: KeysResult,
  ): CreateKeysResponseDto {
    return {
      privateKey: keysResult.privateKey,
      publicKey: keysResult.publicKey,
    };
  }

  private static ecNamedCurve(type: string, ecNamedCurveValue: string) : EcNamedCurve | undefined {
    if (type !== ALGORITHM_EC) {
      return undefined;
    }
    
    return ecNamedCurveValue as EcNamedCurve;
  }

  private static aesKeySize(type: string, keySize: string) : AesKeySize | undefined {
    if (type !== ALGORITHM_AES) {
      return undefined;
    }

    switch (keySize) {
      case '128':
        return 128;
      case '196':
        return 196;
      case '256':
        return 256;
      default:
        throw new BadRequestException(`invalid aes key size: ${keySize}`);
    }
  }

  private static rsaKeySize(type: string, keySize: string) : RsaKeySize | undefined {
    if (type !== ALGORITHM_RSA) {
      return undefined;
    }

    switch (keySize) {
      case '1024':
        return 1024;
      case '2048':
        return 2048;
      case '4096':
        return 4096;
      default:
        throw new BadRequestException(`invalid rsa key size: ${keySize}`);
    }
  }

  private static stringToAlgorithmName(type: string): SupportedAlgorithms {
    switch (type.toUpperCase()) {
      case ALGORITHM_AES.toUpperCase():
        return ALGORITHM_AES;
      case ALGORITHM_EC.toUpperCase():
        return ALGORITHM_EC;
      case ALGORITHM_RSA.toUpperCase():
        return ALGORITHM_RSA;
      default:
        throw new Error(`Unknown key type: '${type}'`);
    }
  }
}
