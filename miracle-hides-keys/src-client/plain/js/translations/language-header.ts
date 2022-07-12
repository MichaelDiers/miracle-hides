export enum HeaderLanguageKeys {
  ASYMMETRIC_ALGORITHMS = 'asymmetricAlgorithms',
  MENU_HEADLINE = 'menuHeadline',
  SYMMETRIC_ALGORITHMS = 'symmetricAlgorithms',
}

export interface HeaderLanguage {
  [HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS]: string;
  [HeaderLanguageKeys.MENU_HEADLINE]: string;
  [HeaderLanguageKeys.SYMMETRIC_ALGORITHMS]: string;
}
