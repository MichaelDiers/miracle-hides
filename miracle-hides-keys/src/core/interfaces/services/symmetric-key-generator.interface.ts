import { AesKeySize, SupportedSymmetricAlgorithms } from '../data/data-types';

export interface SymmetricKeyGenerator {
  generateAsync({
    type,
    aesKeySize,
  }:{
    type: SupportedSymmetricAlgorithms,
    aesKeySize?: AesKeySize,
  }): Promise<string>;
}

export const SYMMETRIC_KEY_GENERATOR = 'SYMMETRIC_KEY_GENERATOR';
