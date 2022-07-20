import { AesKeySize, SupportedSymmetricAlgorithms } from '../data/data-types';
import KeysResult from '../data/keys-result.interface';

export interface SymmetricKeyGenerator {
  generateAsync({
    type,
    aesKeySize,
    hmacKeySize,
    testInput,
  }:{
    type: SupportedSymmetricAlgorithms,
    aesKeySize?: AesKeySize,
    hmacKeySize?: number,
    testInput?: string,
  }): Promise<KeysResult>;
}

export const SYMMETRIC_KEY_GENERATOR = 'SYMMETRIC_KEY_GENERATOR';
