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

@Injectable()
export default class KeyGeneratorService implements KeyGenerator {
  constructor(
    @Inject(RSA_KEY_GENERATOR)
    private readonly rsaKeyGenerator: RsaKeyGenerator,
  ) {}

  async generateAsync(keyOptions: KeyOptions): Promise<KeysResult> {
    switch (keyOptions.type) {
      case KeyType.Rsa:
        return this.rsaKeyGenerator.generateAsync({
          keySize: keyOptions.keySize,
        });
      default:
        throw new BadRequestException(`Unknown key type '${keyOptions.type}'`);
    }
  }
}
