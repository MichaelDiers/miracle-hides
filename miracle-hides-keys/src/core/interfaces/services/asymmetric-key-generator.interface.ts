import { types, KeysResult } from '../data/data';
import { SupportedAsymmetricAlgorithms } from '../data/data-types';

export interface AsymmetricKeyGenerator {
  generateAsync({
    ecNamedCurve,
    rsaKeySize,
    type,
  } : {
    ecNamedCurve?: types.EcNamedCurve,
    rsaKeySize?: types.RsaKeySize,
    type: SupportedAsymmetricAlgorithms,
  }): Promise<KeysResult>;
}

export const ASYMMETRIC_KEY_GENERATOR = 'ASYMMETRIC_KEY_GENERATOR';
