import LanguagePage from './language-page';

export enum RsaLanguageKeys {
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

export interface RsaLanguage extends LanguagePage {
  [RsaLanguageKeys.KEY_SIZE]: string;
  [RsaLanguageKeys.KEY_SIZE_1024]: string;
  [RsaLanguageKeys.KEY_SIZE_2048]: string;
  [RsaLanguageKeys.KEY_SIZE_4096]: string;
  [RsaLanguageKeys.PRIVATE_KEY]: string;
  [RsaLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: string;
  [RsaLanguageKeys.PUBLIC_KEY]: string;
  [RsaLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: string;
  [RsaLanguageKeys.SUBMIT]: string;
  [RsaLanguageKeys.UNABLE_TO_GENERATE_KEYS]: string;
}
