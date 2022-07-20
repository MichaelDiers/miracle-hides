import { LanguagePage } from './language-page';

export enum AsymmetricLanguageKeys {
  EC_NAMED_CURVE = 'ecNamedCurve',
  EC_NAMED_CURVE_SECT239K1 = 'ecNamedCurveSect239k1',
  KEY_SIZE = 'keySize',
  KEY_SIZE_1024 = 'keySize1024',
  KEY_SIZE_2048 = 'keySize2048',
  KEY_SIZE_4096 = 'keySize4096',
  PRIVATE_KEY = 'privateKey',
  PRIVATE_KEY_PLACEHOLDER = 'privateKeyPlaceholder',
  PUBLIC_KEY = 'publicKey',
  PUBLIC_KEY_PLACEHOLDER = 'publicKeyPlaceholder',
  KEY_TYPE = 'keyType',
  KEY_TYPE_RSA = 'keyTypeRsa',
  KEY_TYPE_EC = 'keyTypeEc',
  SUBMIT = 'submit',
  UNABLE_TO_GENERATE_KEYS = 'unableToGenerateKeys',
  TEST_INPUT = 'testInput',
  TEST_INPUT_PLACEHOLDER = 'testInputPlaceholder',
  TEST_INPUT_ENCRYPTED = 'testInputEncrypted',
  TEST_INPUT_ENCRYPTED_PLACEHOLDER = 'testInputEncryptedPlaceholder',
  TEST_INPUT_DECRYPTED = 'testInputDecrypted',
  TEST_INPUT_DECRYPTED_PLACEHOLDER = 'testInputDecryptedPlaceholder',
}

export interface AsymmetricLanguage extends LanguagePage {
  [AsymmetricLanguageKeys.EC_NAMED_CURVE]: string;
  [AsymmetricLanguageKeys.EC_NAMED_CURVE_SECT239K1]: string;
  [AsymmetricLanguageKeys.KEY_SIZE]: string;
  [AsymmetricLanguageKeys.KEY_SIZE_1024]: string;
  [AsymmetricLanguageKeys.KEY_SIZE_2048]: string;
  [AsymmetricLanguageKeys.KEY_SIZE_4096]: string;
  [AsymmetricLanguageKeys.KEY_TYPE]: string;
  [AsymmetricLanguageKeys.KEY_TYPE_RSA]: string;
  [AsymmetricLanguageKeys.KEY_TYPE_EC]: string;
  [AsymmetricLanguageKeys.PRIVATE_KEY]: string;
  [AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: string;
  [AsymmetricLanguageKeys.PUBLIC_KEY]: string;
  [AsymmetricLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: string;
  [AsymmetricLanguageKeys.SUBMIT]: string;
  [AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: string;
  [AsymmetricLanguageKeys.TEST_INPUT]: string;
  [AsymmetricLanguageKeys.TEST_INPUT_PLACEHOLDER]: string;
  [AsymmetricLanguageKeys.TEST_INPUT_ENCRYPTED]: string;
  [AsymmetricLanguageKeys.TEST_INPUT_ENCRYPTED_PLACEHOLDER]: string;
  [AsymmetricLanguageKeys.TEST_INPUT_DECRYPTED]: string;
  [AsymmetricLanguageKeys.TEST_INPUT_DECRYPTED_PLACEHOLDER]: string;
}
