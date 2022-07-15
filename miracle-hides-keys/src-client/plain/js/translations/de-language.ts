import Logger from '../infrastructure/logger';
import { AsymmetricPageEvent } from '../pages/asymmetric.page';
import { FooterPageEvent } from '../pages/footer.page';
import { HeaderPageEvent } from '../pages/header.page';
import { LicensePageEvent } from '../pages/license-page';
import { SymmetricPageEvent } from '../pages/symmetric.page';
import BaseLanguage from './base-language';
import { AsymmetricLanguageKeys } from './language-asymmetric';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from './language-common';
import { FooterLanguageKeys } from './language-footer';
import { HeaderLanguageKeys } from './language-header';
import { LicenseLanguageKeys } from './language-license';
import { LanguagePageKeys } from './language-page';
import { SymmetricLanguageKeys } from './language-symmetric';

export default class DeLanguage extends BaseLanguage {
  constructor(logger: Logger) {
    super(
      'de',
      {
        [AsymmetricPageEvent]: {
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
        [COMMON_LANGUAGE_SOURCE]: {
          [CommonLanguageKeys.ALGORITHM_AES]: 'AES',
          [CommonLanguageKeys.ALGORITHM_EC]: 'EC',
          [CommonLanguageKeys.ALGORITHM_HMAC]: 'HMAC',
          [CommonLanguageKeys.ALGORITHM_RSA]: 'RSA',
          [CommonLanguageKeys.ASYMMETRIC_ENCRYPTION]: 'asymmetrische Verschlüsselung',
          [CommonLanguageKeys.GENERATE]: 'Generieren',
          [CommonLanguageKeys.MIRACLE_HIDES_KEYS]: 'Miracle Hides Keys',
          [CommonLanguageKeys.SYMMETRIC_ENCRYPTION]: 'symmetrische Verschlüsselung',
        },
        [FooterPageEvent]: {
          [FooterLanguageKeys.LICENSES]: 'Lizenzen',
        },
        [HeaderPageEvent]: {
          [HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS]: 'asymmetrische Algorithmen',
          [HeaderLanguageKeys.MENU_HEADLINE]: 'Miracle Hides Keys',
          [HeaderLanguageKeys.SYMMETRIC_ALGORITHMS]: 'symmetrische Algorithmen',
        },
        [SymmetricPageEvent]: {
          [LanguagePageKeys.HEADLINE]: 'Symmetric Keys Generator',
          [SymmetricLanguageKeys.AES_KEY_SIZE]: 'Schlüssellänge',
          [SymmetricLanguageKeys.AES_KEY_SIZE_128]: '128',
          [SymmetricLanguageKeys.AES_KEY_SIZE_192]: '192',
          [SymmetricLanguageKeys.AES_KEY_SIZE_256]: '256',
          [SymmetricLanguageKeys.AES_KEY_SIZE_PLACEHOLDER]: 'Schlüssellänge',
          [SymmetricLanguageKeys.HMAC_KEY_SIZE]: 'Schlüssellänge',
          [SymmetricLanguageKeys.KEY_TYPE]: 'Algorithmus',
          [SymmetricLanguageKeys.KEY_TYPE_AES]: 'AES',
          [SymmetricLanguageKeys.KEY_TYPE_HMAC]: 'HMAC',
          [SymmetricLanguageKeys.PRIVATE_KEY]: 'Schlüssel',
          [SymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: 'noch kein Schlüssel generiert',
          [SymmetricLanguageKeys.SUBMIT]: 'Generieren',
          [SymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: 'Schlüssel können zur Zeit nicht genriert werden.',
        },
        [LicensePageEvent]: {
          [LicenseLanguageKeys.LICENSES]: 'Lizenzen',
          [LicenseLanguageKeys.LICENSES_FONTS]: 'Schriftarten',
          [LicenseLanguageKeys.LICENSES_NODE]: 'Bibliotheken',
          [LicenseLanguageKeys.NODE_DEPARTMENT]: 'Department',
          [LicenseLanguageKeys.NODE_RELATED_TO]: 'Related To',
          [LicenseLanguageKeys.NODE_NAME]: 'Name',
          [LicenseLanguageKeys.NODE_LICENSE_PERIOD]: 'License Period',
          [LicenseLanguageKeys.NODE_MATERIAL]: 'Material',
          [LicenseLanguageKeys.NODE_LICENSE_TYPE]: 'License Type',
          [LicenseLanguageKeys.NODE_LINK]: 'Link',
          [LicenseLanguageKeys.NODE_REMOTE_VERSION]: 'Remote Version',
          [LicenseLanguageKeys.NODE_INSTALLED_VERSION]: 'Installed Version',
          [LicenseLanguageKeys.NODE_DEFINED_VERSION]: 'Defined Version',
          [LicenseLanguageKeys.NODE_AUTHOR]: 'Author',
          [LicenseLanguageKeys.FONT_FONT]: 'Schrift',
          [LicenseLanguageKeys.FONT_LICENSE]: 'Lizenz',
          [LicenseLanguageKeys.FONT_AUTHOR]: 'Autor',
          [LicenseLanguageKeys.FONT_LINK]: 'Link',
        }
      },
      logger,
    );
  }
}
