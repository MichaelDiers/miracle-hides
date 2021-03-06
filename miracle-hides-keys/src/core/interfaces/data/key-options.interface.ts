import {
  AesKeySize,
  EcNamedCurve,
  RsaKeySize,
  SupportedAlgorithms,
} from './data-types';

export default interface KeyOptions {
  aesKeySize?: AesKeySize;

  ecNamedCurve?: EcNamedCurve;

  hmacKeySize?: number;

  rsaKeySize?: RsaKeySize;

  testInput?: string;

  type: SupportedAlgorithms;
}
