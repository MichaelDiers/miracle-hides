import BaseLanguage from './base-language';
import { AsymmetricLanguageKeys } from './language-asymmetric';
import { LanguagePageKeys } from './language-page';

export default class DeLanguage extends BaseLanguage {
  constructor() {
    super(
      'de',
      {
        asymmetricPage: {
          [LanguagePageKeys.HEADLINE]: 'Asymmetric Keys Generator',
          [AsymmetricLanguageKeys.KEY_SIZE]: 'Schlüssellänge',
          [AsymmetricLanguageKeys.KEY_SIZE_1024]: '1024',
          [AsymmetricLanguageKeys.KEY_SIZE_2048]: '2048',
          [AsymmetricLanguageKeys.KEY_SIZE_4096]: '4096',
          [AsymmetricLanguageKeys.SUBMIT]: 'Generieren',
          [AsymmetricLanguageKeys.PUBLIC_KEY]: 'Öffentlicher Schlüssel',
          [AsymmetricLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [AsymmetricLanguageKeys.PRIVATE_KEY]: 'Privater Schlüssel',
          [AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: 'Schlüssel können zur Zeit nicht genriert werden.',
        },
      },
    );
  }
}
