import LanguagePage from './language-page';

export enum AsymmetricLanguageKeys {
  KEY_SIZE = 'keySize',
  KEY_SIZE_1024 = 'keySize1024',
  KEY_SIZE_2048 = 'keySize2048',
  KEY_SIZE_4096 = 'keySize4096',
  PRIVATE_KEY = 'privateKey',
  PRIVATE_KEY_PLACEHOLDER = 'privateKeyPlaceholder',
  PUBLIC_KEY = 'publicKey',
  PUBLIC_KEY_PLACEHOLDER = 'publicKeyPlaceholder',
  SUBMIT = 'submit',
  UNABLE_TO_GENERATE_KEYS = 'unableToGenerateKeys',
}

export interface AsymmetricLanguage extends LanguagePage {
  [AsymmetricLanguageKeys.KEY_SIZE]: string;
  [AsymmetricLanguageKeys.KEY_SIZE_1024]: string;
  [AsymmetricLanguageKeys.KEY_SIZE_2048]: string;
  [AsymmetricLanguageKeys.KEY_SIZE_4096]: string;
  [AsymmetricLanguageKeys.PRIVATE_KEY]: string;
  [AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: string;
  [AsymmetricLanguageKeys.PUBLIC_KEY]: string;
  [AsymmetricLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: string;
  [AsymmetricLanguageKeys.SUBMIT]: string;
  [AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: string;
}
