import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  KeyGenerator,
  LOGGER,
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
    @Inject(LOGGER)
    private readonly logger: Logger,
  ) {}

  async generateAsync(keyOptions: KeyOptions): Promise<KeysResult> {
    switch (keyOptions.type) {
      case KeyType.Rsa:
        return this.rsaKeyGenerator.generateAsync({
          keySize: keyOptions.keySize,
        });
      default:
        this.logger.error(`Unknown key type '${keyOptions.type}'`);
        return { publicKey: '', privateKey: '' };
    }
  }
}
