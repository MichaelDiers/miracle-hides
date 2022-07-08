import { AesKeySize, EcNamedCurve, RsaKeySize, SupportedAlgorithms } from './data-types';

export default interface KeyOptions {
  aesKeySize?: AesKeySize;

  ecNamedCurve?: EcNamedCurve;

  rsaKeySize?: RsaKeySize;

  type: SupportedAlgorithms;
}
