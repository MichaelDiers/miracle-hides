import Logger from '../infrastructure/logger';
import BaseLanguage from './base-language';
import { AsymmetricLanguageKeys } from './language-asymmetric';
import { LanguagePageKeys } from './language-page';

export default class DeLanguage extends BaseLanguage {
  constructor(logger: Logger) {
    super(
      'de',
      {
        asymmetricPage: {
          [LanguagePageKeys.HEADLINE]: 'Asymmetric Keys Generator',
          [AsymmetricLanguageKeys.EC_NAMED_CURVE]: 'Named Curve',
          [AsymmetricLanguageKeys.EC_NAMED_CURVE_SECT239K1]: 'sect239k1',
          [AsymmetricLanguageKeys.KEY_SIZE]: 'Schlüssellänge',
          [AsymmetricLanguageKeys.KEY_SIZE_1024]: '1024',
          [AsymmetricLanguageKeys.KEY_SIZE_2048]: '2048',
          [AsymmetricLanguageKeys.KEY_SIZE_4096]: '4096',
          [AsymmetricLanguageKeys.KEY_TYPE]: 'Algorithmus',
          [AsymmetricLanguageKeys.KEY_TYPE_RSA]: 'RSA',
          [AsymmetricLanguageKeys.KEY_TYPE_EC]: 'EC',
          [AsymmetricLanguageKeys.SUBMIT]: 'Generieren',
          [AsymmetricLanguageKeys.PUBLIC_KEY]: 'Öffentlicher Schlüssel',
          [AsymmetricLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [AsymmetricLanguageKeys.PRIVATE_KEY]: 'Privater Schlüssel',
          [AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: 'Schlüssel können zur Zeit nicht genriert werden.',
        },
      },
      logger,
    );
  }
}
