import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  generateKey,
  KeyObject,
} from 'crypto';
import KeysResult from 'src/core/interfaces/data/keys-result.interface';
import { ALGORITHM_AES, ALGORITHM_HMAC } from '../../core/interfaces/data/data-constants';
import { AesKeySize, SupportedSymmetricAlgorithms } from '../../core/interfaces/data/data-types';
import { SymmetricKeyGenerator } from '../../core/interfaces/services/symmetric-key-generator.interface';

@Injectable()
export default class SymmetricKeyGeneratorService implements SymmetricKeyGenerator {
  // eslint-disable-next-line class-methods-use-this
  generateAsync({
    type,
    aesKeySize,
    hmacKeySize,
    testInput,
  }:{
    type: SupportedSymmetricAlgorithms,
    aesKeySize?: AesKeySize,
    hmacKeySize?: number,
    testInput?: string,
  }): Promise<KeysResult> {
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
            const privateKey = key.export().toString('hex');
            if (!testInput) {
              return resolve({ privateKey });
            }

            if (type === ALGORITHM_AES) {
              const algorithm = `${type.toUpperCase()}-${aesKeySize}-ECB`;
              const cipher = createCipheriv(algorithm, key, null);
              let encrypted = cipher.update(testInput, 'utf-8', 'hex');
              encrypted += cipher.final('hex');

              const decipher = createDecipheriv(algorithm, key, null);
              let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
              decrypted += decipher.final('utf-8');

              return resolve({
                privateKey,
                testInput,
                encrypted,
                decrypted,
              });
            } if (type === ALGORITHM_HMAC) {
              const algorithm = 'sha256';
              const signature = createHmac(algorithm, key).update(testInput, 'utf-8').digest('hex');
              const regenarated = createHmac(algorithm, key).update(testInput, 'utf-8').digest('hex');
              return resolve({
                privateKey,
                testInput,
                encrypted: signature,
                decrypted: `${signature === regenarated}`,
              });
            }

            return resolve({ privateKey });
          } catch (error) {
            return reject(error);
          }
        },
      );
    });
  }
}
