import { BadRequestException, Injectable } from '@nestjs/common';
import { generateKey, KeyObject } from 'crypto';
import { ALGORITHM_AES, ALGORITHM_AES_DEFAULT_KEY_SIZE } from '../../core/interfaces/data/data-constants';
import { AesKeySize, SupportedSymmetricAlgorithms } from '../../core/interfaces/data/data-types';
import { SymmetricKeyGenerator } from '../../core/interfaces/services/symmetric-key-generator.interface';

@Injectable()
export default class SymmetricKeyGeneratorService implements SymmetricKeyGenerator {
  // eslint-disable-next-line class-methods-use-this
  generateAsync({
    type,
    aesKeySize = ALGORITHM_AES_DEFAULT_KEY_SIZE,
  }:{
    type: SupportedSymmetricAlgorithms,
    aesKeySize?: AesKeySize,
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      if (type !== ALGORITHM_AES) {
        throw new BadRequestException(`unsupported algorithm: ${type}`);
      }

      generateKey(
        type,
        {
          length: aesKeySize,
        },
        (err: Error, key: KeyObject) => {
          if (err) {
            return reject(err);
          }

          try {
            return resolve(key.export().toString('hex'));
          } catch (error) {
            return reject(error);
          }
        },
      );
    });
  }
}
