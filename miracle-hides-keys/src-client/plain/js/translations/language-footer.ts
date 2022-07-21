export enum FooterLanguageKeys {
  LANGUAGE_TOGGLE_DE = 'de',
  LANGUAGE_TOGGLE_EN = 'en',
  LICENSES = 'licenses',
}

export interface FooterLanguage {
  [FooterLanguageKeys.LICENSES]: string;
  [FooterLanguageKeys.LANGUAGE_TOGGLE_DE]: string;
  [FooterLanguageKeys.LANGUAGE_TOGGLE_EN]: string;
}
