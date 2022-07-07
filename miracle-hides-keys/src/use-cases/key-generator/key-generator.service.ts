import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  KeyGenerator,
  RsaKeyGenerator,
  RSA_KEY_GENERATOR,
} from '../../core/interfaces/services/services';
import {
  KeyOptions,
  KeysResult,
  KeyType,
} from '../../core/interfaces/data/data';
import { SymmetricKeyGenerator, SYMMETRIC_KEY_GENERATOR } from '../../../src/core/interfaces/services/symmetric-key-generator.interface';

@Injectable()
export default class KeyGeneratorService implements KeyGenerator {
  constructor(
    @Inject(RSA_KEY_GENERATOR)
    private readonly rsaKeyGenerator: RsaKeyGenerator,
    @Inject(SYMMETRIC_KEY_GENERATOR)
    private readonly symmetricKeyGenerator: SymmetricKeyGenerator,
  ) {}

  async generateAsync(keyOptions: KeyOptions): Promise<KeysResult> {
    switch (keyOptions.type) {
      case KeyType.Rsa:
        return this.rsaKeyGenerator.generateAsync({
          keySize: keyOptions.keySize,
        });
      case KeyType.Aes:
        const result = await this.symmetricKeyGenerator.generateAsync(
          'aes', 
          keyOptions.aesKeySize,
        );
        return { privateKey: result };
      default:
        throw new BadRequestException(`Unknown key type '${keyOptions.type}'`);
    }
  }
}
