export interface SymmetricKeyGenerator {
  generateAsync(
    type: 'aes',
    keySize: 128 | 196 | 256,
  ): Promise<string>;
}

export const SYMMETRIC_KEY_GENERATOR = 'SYMMETRIC_KEY_GENERATOR';
