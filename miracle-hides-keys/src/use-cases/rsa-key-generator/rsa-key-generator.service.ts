import { generateKeyPair, KeyObject } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { RsaKeyOptions, KeysResult } from '../../core/interfaces/data/data';
import {
  Logger,
  LOGGER,
  RsaKeyGenerator,
} from '../../core/interfaces/services/services';

@Injectable()
export default class RsaKeyGeneratorService implements RsaKeyGenerator {
  constructor(@Inject(LOGGER) private readonly loggerService: Logger) {}

  generateAsync(rsaKeyOptions: RsaKeyOptions): Promise<KeysResult> {
    return new Promise((resolve, reject) => {
      generateKeyPair(
        'rsa',
        {
          modulusLength: rsaKeyOptions.keySize,
        },
        (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
          if (err) {
            this.loggerService
              .exception(err.message, err.stack)
              .catch(() => {});
            return reject(err);
          }

          const publicKeyString = publicKey.export({
            type: 'pkcs1',
            format: 'pem',
          }) as string;

          const privateKeyString = privateKey.export({
            type: 'pkcs1',
            format: 'pem',
          }) as string;

          return resolve({
            publicKey: publicKeyString,
            privateKey: privateKeyString,
          });
        },
      );
    });
  }
}
