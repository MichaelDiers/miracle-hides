import { BadRequestException, Injectable } from '@nestjs/common';
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
    const type = TransformerService.stringToKeyType(createKeysRequestDto.type);
    let aesKeySize;
    if (type === KeyType.Aes) {
      switch (createKeysRequestDto.aesKeySize) {
        case '128':
          aesKeySize = 128;
          break;
        case '196':
          aesKeySize = 196;
          break;
        case '256':
          aesKeySize = 256;
          break;
        default:
          throw new BadRequestException('invalid value for aes key size');
      }
    }
    return {
      aesKeySize,
      keySize: parseInt(createKeysRequestDto.keySize, 10),
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

  private static stringToKeyType(type: string): KeyType {
    switch (type.toUpperCase()) {
      case 'AES':
        return KeyType.Aes;
      case 'RSA':
        return KeyType.Rsa;
      default:
        throw new Error(`Unknown key type: '${type}'`);
    }
  }
}
