export type AesKeySize = 128 | 196 | 256;
export type EcNamedCurve = EcNamedCurveSect239k1;
export type EcNamedCurveSect239k1 = 'sect239k1';
export type RsaKeySize = 1024 | 2048 | 4096;
export type SupportedAlgorithms = SupportedAsymmetricAlgorithms | SupportedSymmetricAlgorithms;
export type SupportedSymmetricAlgorithms = 'aes';
export type SupportedAsymmetricAlgorithms = 'rsa' | 'ec';
