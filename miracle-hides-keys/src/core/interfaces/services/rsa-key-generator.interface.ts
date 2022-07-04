import { RsaKeyOptions, KeysResult } from '../data/data';

export interface RsaKeyGenerator {
  generateAsync(rsaKeyOptions: RsaKeyOptions): Promise<KeysResult>;
}

export const RSA_KEY_GENERATOR = 'RSA_KEY_GENERATOR';
