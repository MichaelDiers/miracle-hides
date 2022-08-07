import { LanguagePage } from './language-page';

export enum SymmetricLanguageKeys {
  AES_KEY_SIZE = 'aesKeySize',
  AES_KEY_SIZE_128 = 'aesKeySize128',
  AES_KEY_SIZE_192 = 'aesKeySize192',
  AES_KEY_SIZE_256 = 'aesKeySize256',
  AES_KEY_SIZE_PLACEHOLDER = 'aesKeySizePlaceholder',
  HMAC_KEY_SIZE = 'hmacKeySize',
  KEY_TYPE = 'keyType',
  KEY_TYPE_AES = 'keyTypeAes',
  KEY_TYPE_HMAC = 'keyTypeHmac',
  PRIVATE_KEY = 'privateKey',
  PRIVATE_KEY_PLACEHOLDER = 'privateKeyPlaceholder',
  SUBMIT = 'submit',
  UNABLE_TO_GENERATE_KEYS = 'unableToGenerateKeys',
  TEST_INPUT = 'testInput',
  TEST_INPUT_PLACEHOLDER = 'testInputPlaceholder',
  TEST_INPUT_ENCRYPTED = 'testInputEncrypted',
  TEST_INPUT_ENCRYPTED_PLACEHOLDER = 'testInputEncryptedPlaceholder',
  TEST_INPUT_DECRYPTED = 'testInputDecrypted',
  TEST_INPUT_DECRYPTED_PLACEHOLDER = 'testInputDecryptedPlaceholder',
}

export interface SymmetricLanguage extends LanguagePage {
  [SymmetricLanguageKeys.AES_KEY_SIZE]: string;
  [SymmetricLanguageKeys.AES_KEY_SIZE_128]: string;
  [SymmetricLanguageKeys.AES_KEY_SIZE_192]: string;
  [SymmetricLanguageKeys.AES_KEY_SIZE_256]: string;
  [SymmetricLanguageKeys.AES_KEY_SIZE_PLACEHOLDER]: string;
  [SymmetricLanguageKeys.HMAC_KEY_SIZE]: string;
  [SymmetricLanguageKeys.KEY_TYPE]: string;
  [SymmetricLanguageKeys.KEY_TYPE_AES]: string;
  [SymmetricLanguageKeys.KEY_TYPE_HMAC]: string;
  [SymmetricLanguageKeys.PRIVATE_KEY]: string;
  [SymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: string;
  [SymmetricLanguageKeys.SUBMIT]: string;
  [SymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: string;
  [SymmetricLanguageKeys.TEST_INPUT]: string;
  [SymmetricLanguageKeys.TEST_INPUT_PLACEHOLDER]: string;
  [SymmetricLanguageKeys.TEST_INPUT_ENCRYPTED]: string;
  [SymmetricLanguageKeys.TEST_INPUT_ENCRYPTED_PLACEHOLDER]: string;
  [SymmetricLanguageKeys.TEST_INPUT_DECRYPTED]: string;
  [SymmetricLanguageKeys.TEST_INPUT_DECRYPTED_PLACEHOLDER]: string;
}
