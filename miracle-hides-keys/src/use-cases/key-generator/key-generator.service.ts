import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SymmetricKeyGenerator, SYMMETRIC_KEY_GENERATOR } from 'src/core/interfaces/services/symmetric-key-generator.interface';
import { ALGORITHM_AES, ALGORITHM_RSA } from 'src/core/interfaces/data/data-constants';
import {
  KeyGenerator,
  AsymmetricKeyGenerator,
  ASYMMETRIC_KEY_GENERATOR,
} from '../../core/interfaces/services/services';
import {
  KeyOptions,
  KeysResult,
} from '../../core/interfaces/data/data';

@Injectable()
export default class KeyGeneratorService implements KeyGenerator {
  constructor(
    @Inject(ASYMMETRIC_KEY_GENERATOR)
    private readonly asymmetricKeyGenerator: AsymmetricKeyGenerator,
    @Inject(SYMMETRIC_KEY_GENERATOR)
    private readonly symmetricKeyGenerator: SymmetricKeyGenerator,
  ) {}

  async generateAsync(keyOptions: KeyOptions): Promise<KeysResult> {
    switch (keyOptions.type) {
      case ALGORITHM_RSA:
        return this.asymmetricKeyGenerator.generateAsync({
          rsaKeySize: keyOptions.rsaKeySize,
          type: keyOptions.type,
        });
      case ALGORITHM_AES:
        return {
          privateKey: await this.symmetricKeyGenerator.generateAsync({
            type: keyOptions.type,
            aesKeySize: keyOptions.aesKeySize,
          }),
        };
      default:
        throw new BadRequestException(`Unknown key type '${keyOptions.type}'`);
    }
  }
}
