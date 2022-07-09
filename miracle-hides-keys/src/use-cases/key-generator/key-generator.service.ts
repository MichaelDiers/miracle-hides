import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SymmetricKeyGenerator, SYMMETRIC_KEY_GENERATOR } from '../../core/interfaces/services/symmetric-key-generator.interface';
import { SUPPORTED_ASYMMETRIC_ALGORITHMS, SUPPORTED_SYMMETRIC_ALGORITHMS } from '../../core/interfaces/data/data-constants';
import { SupportedAsymmetricAlgorithms, SupportedSymmetricAlgorithms } from '../../core/interfaces/data/data-types';
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
    if (SUPPORTED_ASYMMETRIC_ALGORITHMS.findIndex(
      (algorithm) => algorithm === keyOptions.type,
    ) > -1) {
      return this.asymmetricKeyGenerator.generateAsync({
        ecNamedCurve: keyOptions.ecNamedCurve,
        rsaKeySize: keyOptions.rsaKeySize,
        type: keyOptions.type as SupportedAsymmetricAlgorithms,
      });
    } if (SUPPORTED_SYMMETRIC_ALGORITHMS.findIndex(
      (algorithm) => algorithm === keyOptions.type,
    ) > -1) {
      return {
        privateKey: await this.symmetricKeyGenerator.generateAsync({
          type: keyOptions.type as SupportedSymmetricAlgorithms,
          aesKeySize: keyOptions.aesKeySize,
          hmacKeySize: keyOptions.hmacKeySize,
        }),
      };
    }

    throw new BadRequestException(`unsupported algorithm: ${keyOptions.type}`);
  }
}
