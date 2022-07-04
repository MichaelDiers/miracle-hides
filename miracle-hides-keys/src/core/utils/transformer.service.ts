import { Injectable } from '@nestjs/common';
import CreateKeysRequestDto from '../dtos/create-keys-request.dto';
import CreateKeysResponseDto from '../dtos/create-keys-response.dto';
import { KeyOptions, KeyType, KeysResult } from '../interfaces/data/data';
import { Transformer } from '../interfaces/services/services';

@Injectable()
export default class TransformerService implements Transformer {
  // eslint-disable-next-line class-methods-use-this
  createKeysRequestDtoToKeyOptions(
    createKeysRequestDto: CreateKeysRequestDto,
  ): KeyOptions {
    return {
      keySize: parseInt(createKeysRequestDto.keySize, 10),
      type: TransformerService.stringToKeyType(createKeysRequestDto.type),
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

  private static stringToKeyType(type: string): KeyType {
    switch (type.toUpperCase()) {
      case 'RSA':
        return KeyType.Rsa;
      default:
        throw new Error(`Unknown key type: '${type}'`);
    }
  }
}
