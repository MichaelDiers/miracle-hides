import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SymmetricKeyGenerator, SYMMETRIC_KEY_GENERATOR } from '../../core/interfaces/services/symmetric-key-generator.interface';
import { ALGORITHM_AES, ALGORITHM_EC, ALGORITHM_RSA } from '../../core/interfaces/data/data-constants';
import { SupportedAlgorithms, SupportedAsymmetricAlgorithms, SupportedSymmetricAlgorithms } from '../../core/interfaces/data/data-types';
import {
  KeyGenerator,
  AsymmetricKeyGenerator,
  ASYMMETRIC_KEY_GENERATOR,
} from '../../core/interfaces/services/services';
import {
  KeyOptions,
  KeysResult,
} from '../../core/interfaces/data/data';
import { isInstance } from 'class-validator';

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
      case ALGORITHM_EC:        
        return this.asymmetricKeyGenerator.generateAsync({
          ecNamedCurve: keyOptions.ecNamedCurve,
          rsaKeySize: keyOptions.rsaKeySize,
          type: keyOptions.type as SupportedAsymmetricAlgorithms,
        });
      case ALGORITHM_AES:
        return {
          privateKey: await this.symmetricKeyGenerator.generateAsync({
            type: keyOptions.type as SupportedSymmetricAlgorithms,
            aesKeySize: keyOptions.aesKeySize,
          }),
        };
      default:
        throw new BadRequestException(`unsupported algorithm: ${keyOptions.type}`);
    }
    
    
  }
}
