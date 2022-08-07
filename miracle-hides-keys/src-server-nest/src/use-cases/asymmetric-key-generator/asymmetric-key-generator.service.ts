/**
 * Generator for rsa public and private keys.
 */

import {
  generateKeyPair,
  KeyObject,
  publicEncrypt,
  privateDecrypt,
  createSign,
  createVerify,
} from 'crypto';
import { Injectable } from '@nestjs/common';
import { EcNamedCurve, RsaKeySize, SupportedAsymmetricAlgorithms } from '../../core/interfaces/data/data-types';
import { KeysResult } from '../../core/interfaces/data/data';
import { AsymmetricKeyGenerator } from '../../core/interfaces/services/services';
import { ALGORITHM_EC, ALGORITHM_RSA } from '../../core/interfaces/data/data-constants';

@Injectable()
export default class AsymmetricKeyGeneratorService implements AsymmetricKeyGenerator {
  /**
   *
   * @param rsaKeyOptions {KeyOptions} Options for generating rsa keys.
   * @param rsaKeyOptions.keySize {number} The modulus length used for key generation.
   * @returns {Promise<KeysResult>} A promise whose result contains the public and private rsa key.
   */
  // eslint-disable-next-line class-methods-use-this
  generateAsync({
    ecNamedCurve,
    rsaKeySize,
    testInput,
    type,
  } : {
    ecNamedCurve?: EcNamedCurve,
    rsaKeySize?: RsaKeySize,
    testInput?: string,
    type: SupportedAsymmetricAlgorithms,
  }): Promise<KeysResult> {
    return new Promise((resolve, reject) => {
      if (type === ALGORITHM_RSA) {
        generateKeyPair(
          type,
          { modulusLength: rsaKeySize },
          AsymmetricKeyGeneratorService.createCallbackRsa(resolve, reject, testInput),
        );
      } else if (type === ALGORITHM_EC) {
        generateKeyPair(
          type,
          { namedCurve: ecNamedCurve },
          AsymmetricKeyGeneratorService.createCallbackEc(resolve, reject, testInput),
        );
      }
    });
  }

  private static createCallbackEc(resolve, reject, testInput) {
    const callback = (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
      if (err) {
        return reject(err);
      }

      try {
        const publicKeyString = publicKey.export({
          type: 'spki',
          format: 'pem',
        }) as string;

        const privateKeyString = privateKey.export({
          type: 'sec1',
          format: 'pem',
        }) as string;

        if (!testInput) {
          return resolve({
            publicKey: publicKeyString,
            privateKey: privateKeyString,
          });
        }

        const sign = createSign('SHA256');
        sign.write(testInput);
        sign.end();
        const encrypted = sign.sign(privateKey, 'hex');

        const verify = createVerify('SHA256');
        verify.write(testInput);
        verify.end();
        const decrypted = verify.verify(publicKey, encrypted, 'hex');

        return resolve({
          publicKey: publicKeyString,
          privateKey: privateKeyString,
          testInput,
          encrypted,
          decrypted,
        });
      } catch (error) {
        return reject(error);
      }
    };

    return callback;
  }

  private static createCallbackRsa(resolve, reject, testInput) {
    const callback = (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
      if (err) {
        return reject(err);
      }

      try {
        const publicKeyString = publicKey.export({
          type: 'pkcs1',
          format: 'pem',
        }) as string;
        const privateKeyString = privateKey.export({
          type: 'pkcs1',
          format: 'pem',
        }) as string;

        if (!testInput) {
          return resolve({
            publicKey: publicKeyString,
            privateKey: privateKeyString,
          });
        }

        const encrypted = publicEncrypt(publicKey, Buffer.from(testInput, 'utf8')).toString('base64');
        const decrypted = privateDecrypt(privateKey, Buffer.from(encrypted, 'base64')).toString('utf-8');

        return resolve({
          publicKey: publicKeyString,
          privateKey: privateKeyString,
          testInput,
          encrypted,
          decrypted,
        });
      } catch (error: any) {
        return reject(error);
      }
    };

    return callback;
  }
}
