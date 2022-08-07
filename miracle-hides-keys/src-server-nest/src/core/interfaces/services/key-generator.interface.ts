import { KeyOptions, KeysResult } from '../data/data';

export interface KeyGenerator {
  generateAsync(keyOptions: KeyOptions): Promise<KeysResult>;
}

export const KEY_GENERATOR = 'KEY_GENERATOR';
