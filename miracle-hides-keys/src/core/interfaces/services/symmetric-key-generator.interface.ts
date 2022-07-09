import { AesKeySize, SupportedSymmetricAlgorithms } from '../data/data-types';

export interface SymmetricKeyGenerator {
  generateAsync({
    type,
    aesKeySize,
    hmacKeySize,
  }:{
    type: SupportedSymmetricAlgorithms,
    aesKeySize?: AesKeySize,
    hmacKeySize?: number,
  }): Promise<string>;
}

export const SYMMETRIC_KEY_GENERATOR = 'SYMMETRIC_KEY_GENERATOR';
