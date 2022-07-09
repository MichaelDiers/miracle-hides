import { Injectable } from '@nestjs/common';
import { generateKey, KeyObject } from 'crypto';
import { ALGORITHM_AES } from '../../core/interfaces/data/data-constants';
import { AesKeySize, SupportedSymmetricAlgorithms } from '../../core/interfaces/data/data-types';
import { SymmetricKeyGenerator } from '../../core/interfaces/services/symmetric-key-generator.interface';

@Injectable()
export default class SymmetricKeyGeneratorService implements SymmetricKeyGenerator {
  // eslint-disable-next-line class-methods-use-this
  generateAsync({
    type,
    aesKeySize,
    hmacKeySize,
  }:{
    type: SupportedSymmetricAlgorithms,
    aesKeySize?: AesKeySize,
    hmacKeySize?: number,
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const length = type === ALGORITHM_AES ? aesKeySize : hmacKeySize;
      generateKey(
        type,
        {
          length,
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
