import { Injectable } from '@nestjs/common';
import { generateKey, KeyObject } from 'crypto';
import { SymmetricKeyGenerator } from '../../../src/core/interfaces/services/symmetric-key-generator.interface';

@Injectable()
export default class SymmetricKeyGeneratorService implements SymmetricKeyGenerator {
  generateAsync(
    type: 'aes',
    keySize: 128 | 196 | 256,
  ) : Promise<string> {
    return new Promise((resolve, reject) => {
      generateKey(
        type,
        {
          length: keySize,
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
        }
      )
    });
  }
}
