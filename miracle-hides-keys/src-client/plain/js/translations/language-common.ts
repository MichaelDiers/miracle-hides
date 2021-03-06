export enum CommonLanguageKeys {
  ALGORITHM_AES = 'algorithmAes',
  ALGORITHM_EC = 'algorithmEc',
  ALGORITHM_HMAC = 'algorithmHmac',
  ALGORITHM_RSA = 'algorithmRsa',
  ASYMMETRIC_ENCRYPTION = 'asymmetricEncryption',
  GENERATE = 'generate',
  LICENSES = 'licenses',
  MIRACLE_HIDES_KEYS = 'miracleHidesKeys',
  SYMMETRIC_ENCRYPTION = 'symmetricEncryption',
  TEST_INPUT = 'testInput',
}

export const COMMON_LANGUAGE_SOURCE = 'commonLanguageSource';

export interface CommonLanguage {
  [CommonLanguageKeys.ALGORITHM_AES]: string;
  [CommonLanguageKeys.ALGORITHM_EC]: string;
  [CommonLanguageKeys.ALGORITHM_HMAC]: string;
  [CommonLanguageKeys.ALGORITHM_RSA]: string;
  [CommonLanguageKeys.ASYMMETRIC_ENCRYPTION]: string;
  [CommonLanguageKeys.GENERATE]: string;
  [CommonLanguageKeys.LICENSES]: string;
  [CommonLanguageKeys.MIRACLE_HIDES_KEYS]: string;
  [CommonLanguageKeys.SYMMETRIC_ENCRYPTION]: string;
  [CommonLanguageKeys.TEST_INPUT]: string;
}
