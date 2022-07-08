export type AesKeySize = 128 | 196 | 256;
export type RsaKeySize = 1024 | 2048 | 4096;
export type SupportedAlgorithms = SupportedAsymmetricAlgorithms | SupportedSymmetricAlgorithms;
export type SupportedSymmetricAlgorithms = 'aes';
export type SupportedAsymmetricAlgorithms = 'rsa';
