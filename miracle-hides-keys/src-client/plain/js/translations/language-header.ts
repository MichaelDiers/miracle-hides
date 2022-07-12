export enum HeaderLanguageKeys {
  ASYMMETRIC_ALGORITHMS = 'asymmetricAlgorithms',
  SYMMETRIC_ALGORITHMS = 'symmetricAlgorithms',
}

export interface HeaderLanguage {
  [HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS]: string;
  [HeaderLanguageKeys.SYMMETRIC_ALGORITHMS]: string;
}
