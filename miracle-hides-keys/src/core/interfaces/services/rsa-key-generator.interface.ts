import { types, KeysResult } from '../data/data';

export interface RsaKeyGenerator {
  generateAsync({ rsaKeySize } : { rsaKeySize?: types.RsaKeySize }): Promise<KeysResult>;
}

export const RSA_KEY_GENERATOR = 'RSA_KEY_GENERATOR';
