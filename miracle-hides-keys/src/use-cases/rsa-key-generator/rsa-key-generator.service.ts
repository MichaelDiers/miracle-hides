import { generateKeyPair, KeyObject } from 'crypto';
import { Injectable } from '@nestjs/common';
import { RsaKeyOptions, KeysResult } from '../../core/interfaces/data/data';
import { RsaKeyGenerator } from '../../core/interfaces/services/services';

@Injectable()
export default class RsaKeyGeneratorService implements RsaKeyGenerator {
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
