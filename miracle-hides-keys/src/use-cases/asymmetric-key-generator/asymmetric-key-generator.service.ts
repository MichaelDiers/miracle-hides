/**
 * Generator for rsa public and private keys.
 */

import { generateKeyPair, KeyObject } from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EcNamedCurve, RsaKeySize, SupportedAsymmetricAlgorithms } from '../../core/interfaces/data/data-types';
import { KeysResult } from '../../core/interfaces/data/data';
import { AsymmetricKeyGenerator } from '../../core/interfaces/services/services';
import { ALGORITHM_EC, ALGORITHM_RSA, ALGORITHM_RSA_DEFAULT_KEY_SIZE } from '../../core/interfaces/data/data-constants';

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
    rsaKeySize = ALGORITHM_RSA_DEFAULT_KEY_SIZE,
    type,
  } : {
    ecNamedCurve?: EcNamedCurve,
    rsaKeySize?: RsaKeySize,
    type: SupportedAsymmetricAlgorithms,
  }): Promise<KeysResult> {
    return new Promise((resolve, reject) => {
      if (type === ALGORITHM_RSA) {
        generateKeyPair(
          type,
          { modulusLength: rsaKeySize },
          AsymmetricKeyGeneratorService.createCallback(resolve, reject, type)
        );
      } else if (type === ALGORITHM_EC) {
        generateKeyPair(
          type,
          { namedCurve: ecNamedCurve },
          AsymmetricKeyGeneratorService.createCallback(resolve, reject, type)
        );
      }
    });
  } 

  private static createCallback(resolve, reject, algorithm) {
    const callback = (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
      if (err) {
        return reject(err);
      }

      try {
        let optionsPrivate;
        let optionsPublic;
        if (algorithm === ALGORITHM_EC) {
          optionsPrivate = {
            type: 'sec1',
            format: 'pem',
          };

          optionsPublic = {
            type: 'spki',
            format: 'pem',  
          };
        } else if (algorithm === ALGORITHM_RSA) {
          optionsPrivate = {
            type: 'pkcs1',
            format: 'pem',
          };

          optionsPublic = {
            type: 'pkcs1',
            format: 'pem',  
          };
        }

        const publicKeyString = publicKey.export(optionsPublic) as string;
        const privateKeyString = privateKey.export(optionsPrivate) as string;
    
        return resolve({
          publicKey: publicKeyString,
          privateKey: privateKeyString,
        });
      } catch (error: any) {
        return reject(error);        
      }
    };

    return callback;
  }
}