/**
 * Generator for rsa public and private keys.
 */

import { generateKeyPair, KeyObject } from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RsaKeySize, SupportedAsymmetricAlgorithms } from 'src/core/interfaces/data/data-types';
import { ALGORITHM_RSA, ALGORITHM_RSA_DEFAULT_KEY_SIZE } from 'src/core/interfaces/data/data-constants';
import { KeysResult } from '../../core/interfaces/data/data';
import { AsymmetricKeyGenerator } from '../../core/interfaces/services/services';

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
    rsaKeySize,
    type,
  } : {    
    rsaKeySize?: RsaKeySize,
    type: SupportedAsymmetricAlgorithms,
  }): Promise<KeysResult> {
    return new Promise((resolve, reject) => {
      if (type !== ALGORITHM_RSA) {
        throw new BadRequestException(`unsupported algorithm: ${type}`);
      }

      generateKeyPair(
        type,
        {
          modulusLength: rsaKeySize,
        },
        (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
          if (err) {
            return reject(err);
          }

          try {
            return resolve(
              AsymmetricKeyGeneratorService.handleGenerateResult(
                publicKey,
                privateKey,
              ),
            );
          } catch (error: any) {
            return reject(error);
          }
        },
      );
    });
  }

  /**
   * Callback function for generating rsa keys.
   * @param publicKey {KeyObject} The public rsa key.
   * @param privateKey {KeyObject} The private rsa key.
   * @returns {KeysResult} The private and public key as a string.
   */
  private static handleGenerateResult(
    publicKey: KeyObject,
    privateKey: KeyObject,
  ): KeysResult {
    const publicKeyString = publicKey.export({
      type: 'pkcs1',
      format: 'pem',
    }) as string;

    const privateKeyString = privateKey.export({
      type: 'pkcs1',
      format: 'pem',
    }) as string;

    return {
      publicKey: publicKeyString,
      privateKey: privateKeyString,
    };
  }
}
