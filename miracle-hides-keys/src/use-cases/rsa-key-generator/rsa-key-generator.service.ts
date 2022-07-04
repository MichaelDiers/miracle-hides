/**
 * Generator for rsa public and private keys.
 */

import { generateKeyPair, KeyObject } from 'crypto';
import { Injectable } from '@nestjs/common';
import { RsaKeyOptions, KeysResult } from '../../core/interfaces/data/data';
import { RsaKeyGenerator } from '../../core/interfaces/services/services';

@Injectable()
export default class RsaKeyGeneratorService implements RsaKeyGenerator {
  /**
   *
   * @param rsaKeyOptions {KeyOptions} Options for generating rsa keys.
   * @param rsaKeyOptions.keySize {number} The modulus length used for key generation.
   * @returns {Promise<KeysResult>} A promise whose result contains the public and private rsa key.
   */
  // eslint-disable-next-line class-methods-use-this
  generateAsync(rsaKeyOptions: RsaKeyOptions): Promise<KeysResult> {
    return new Promise((resolve, reject) => {
      generateKeyPair(
        'rsa',
        {
          modulusLength: rsaKeyOptions.keySize,
        },
        (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
          if (err) {
            return reject(err);
          }

          try {
            return resolve(
              RsaKeyGeneratorService.handleGenerateResult(
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
