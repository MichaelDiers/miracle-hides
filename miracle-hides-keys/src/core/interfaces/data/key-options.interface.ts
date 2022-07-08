import { AesKeySize, RsaKeySize, SupportedAlgorithms } from './data-types';

export default interface KeyOptions {
  aesKeySize?: AesKeySize;

  rsaKeySize?: RsaKeySize;

  type: SupportedAlgorithms;
}
