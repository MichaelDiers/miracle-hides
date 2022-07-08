import BaseLanguage from './base-language';
import { RsaLanguageKeys } from './language-rsa';
import { LanguagePageKeys } from './language-page';

export default class DeLanguage extends BaseLanguage {
  constructor() {
    super(
      'de',
      {
        rsaPage: {
          [LanguagePageKeys.HEADLINE]: 'RSA Generator',
          [RsaLanguageKeys.KEY_SIZE]: 'Schlüssellänge',
          [RsaLanguageKeys.KEY_SIZE_1024]: '1024',
          [RsaLanguageKeys.KEY_SIZE_2048]: '2048',
          [RsaLanguageKeys.KEY_SIZE_4096]: '4096',
          [RsaLanguageKeys.SUBMIT]: 'Generieren',
          [RsaLanguageKeys.PUBLIC_KEY]: 'Öffentlicher Schlüssel',
          [RsaLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [RsaLanguageKeys.PRIVATE_KEY]: 'Privater Schlüssel',
          [RsaLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [RsaLanguageKeys.UNABLE_TO_GENERATE_KEYS]: 'Schlüssel können zur Zeit nicht genriert werden.',
        },
      },
    );
  }
}
