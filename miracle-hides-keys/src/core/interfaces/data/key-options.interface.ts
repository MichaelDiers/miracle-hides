import KeyType from './key-type.enum';

export default interface KeyOptions {
  aesKeySize?: 128 | 196 | 256;

  keySize: number;

  type: KeyType;
}
