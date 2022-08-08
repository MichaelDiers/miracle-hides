import Logger from '../infrastructure/logger';
import PageEvents from '../pages/page-events';
import BaseLanguage from './base-language';
import { AsymmetricLanguageKeys } from './language-asymmetric';
import { CommonLanguageKeys, COMMON_LANGUAGE_SOURCE } from './language-common';
import { SideMenuLanguageKeys } from './language-side-menu';
import { HeaderLanguageKeys } from './language-header';
import { LicenseLanguageKeys } from './language-license';
import { LanguagePageKeys } from './language-page';
import { SymmetricLanguageKeys } from './language-symmetric';

export default class EnLanguage extends BaseLanguage {
  constructor(logger: Logger) {
    super(
      'en',
      {
        [PageEvents.ASYMMETRIC_PAGE]: {
          [LanguagePageKeys.HEADLINE]: 'Asymmetric Keys Generator',
          [AsymmetricLanguageKeys.EC_NAMED_CURVE]: 'Named Curve',
          [AsymmetricLanguageKeys.EC_NAMED_CURVE_SECT239K1]: 'sect239k1',
          [AsymmetricLanguageKeys.KEY_SIZE]: 'Key Size',
          [AsymmetricLanguageKeys.KEY_SIZE_1024]: '1024',
          [AsymmetricLanguageKeys.KEY_SIZE_2048]: '2048',
          [AsymmetricLanguageKeys.KEY_SIZE_4096]: '4096',
          [AsymmetricLanguageKeys.KEY_TYPE]: 'Algorithm',
          [AsymmetricLanguageKeys.KEY_TYPE_RSA]: 'RSA',
          [AsymmetricLanguageKeys.KEY_TYPE_EC]: 'EC',
          [AsymmetricLanguageKeys.SUBMIT]: 'Generate',
          [AsymmetricLanguageKeys.PUBLIC_KEY]: 'Public Key',
          [AsymmetricLanguageKeys.PUBLIC_KEY_PLACEHOLDER]: 'no public key generated yet',
          [AsymmetricLanguageKeys.PRIVATE_KEY]: 'Private Key',
          [AsymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: 'no private key generated yet',
          [AsymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: 'Keys cannot be generated at the moment.',
          [AsymmetricLanguageKeys.TEST_INPUT]: 'Original Text',
          [AsymmetricLanguageKeys.TEST_INPUT_PLACEHOLDER]: 'The text to encrypt.',
          [AsymmetricLanguageKeys.TEST_INPUT_ENCRYPTED]: 'Encrypted Text or Signature',
          [AsymmetricLanguageKeys.TEST_INPUT_ENCRYPTED_PLACEHOLDER]: 'Encrypted text or signature.',
          [AsymmetricLanguageKeys.TEST_INPUT_DECRYPTED]: 'Decrypted Text/Signature is valid',
          [AsymmetricLanguageKeys.TEST_INPUT_DECRYPTED_PLACEHOLDER]: 'Decrypted Text/Signature is valid',
        },
        [COMMON_LANGUAGE_SOURCE]: {
          [CommonLanguageKeys.ALGORITHM_AES]: 'AES',
          [CommonLanguageKeys.ALGORITHM_EC]: 'EC',
          [CommonLanguageKeys.ALGORITHM_HMAC]: 'HMAC',
          [CommonLanguageKeys.ALGORITHM_RSA]: 'RSA',
          [CommonLanguageKeys.ASYMMETRIC_ENCRYPTION]: 'Asymmetric Encryption',
          [CommonLanguageKeys.GENERATE]: 'Generate',
          [CommonLanguageKeys.LICENSES]: 'Licenses',
          [CommonLanguageKeys.MIRACLE_HIDES_KEYS]: 'Miracle Hides Keys',
          [CommonLanguageKeys.SYMMETRIC_ENCRYPTION]: 'Symmetric Encryption',
          [CommonLanguageKeys.TEST_INPUT]: 'Hello World!',
        },
        [PageEvents.SIDE_MENU_PAGE]: {
          [SideMenuLanguageKeys.LANGUAGE_TOGGLE_DE]: 'Deutsch',
          [SideMenuLanguageKeys.LANGUAGE_TOGGLE_EN]: 'English',
        },
        [PageEvents.HEADER_PAGE]: {
          [HeaderLanguageKeys.ASYMMETRIC_ALGORITHMS]: 'Asymmetric Algorithms',
          [HeaderLanguageKeys.MENU_HEADLINE]: 'Miracle Hides Keys',
          [HeaderLanguageKeys.SYMMETRIC_ALGORITHMS]: 'Symmetric Algorithms',
        },
        [PageEvents.SYMMETRIC_PAGE]: {
          [LanguagePageKeys.HEADLINE]: 'Symmetric Keys Generator',
          [SymmetricLanguageKeys.AES_KEY_SIZE]: 'Key Size',
          [SymmetricLanguageKeys.AES_KEY_SIZE_128]: '128',
          [SymmetricLanguageKeys.AES_KEY_SIZE_192]: '192',
          [SymmetricLanguageKeys.AES_KEY_SIZE_256]: '256',
          [SymmetricLanguageKeys.AES_KEY_SIZE_PLACEHOLDER]: 'Key Size',
          [SymmetricLanguageKeys.HMAC_KEY_SIZE]: 'Key Size',
          [SymmetricLanguageKeys.KEY_TYPE]: 'Algorithm',
          [SymmetricLanguageKeys.KEY_TYPE_AES]: 'AES',
          [SymmetricLanguageKeys.KEY_TYPE_HMAC]: 'HMAC',
          [SymmetricLanguageKeys.PRIVATE_KEY]: 'Key',
          [SymmetricLanguageKeys.PRIVATE_KEY_PLACEHOLDER]: 'no key generated yet',
          [SymmetricLanguageKeys.SUBMIT]: 'Generate',
          [SymmetricLanguageKeys.UNABLE_TO_GENERATE_KEYS]: 'Keys cannot be generated at the moment.',
          [SymmetricLanguageKeys.TEST_INPUT]: 'Original Text',
          [SymmetricLanguageKeys.TEST_INPUT_PLACEHOLDER]: 'The text to encrypt.',
          [SymmetricLanguageKeys.TEST_INPUT_ENCRYPTED]: 'Encrypted Text or Signature',
          [SymmetricLanguageKeys.TEST_INPUT_ENCRYPTED_PLACEHOLDER]: 'Encrypted text or signature.',
          [SymmetricLanguageKeys.TEST_INPUT_DECRYPTED]: 'Decrypted Text/Signature is valid',
          [SymmetricLanguageKeys.TEST_INPUT_DECRYPTED_PLACEHOLDER]: 'Decrypted Text/Signature is valid',
        },
        [PageEvents.LICENSE_PAGE]: {
          [LicenseLanguageKeys.LICENSES]: 'Licenses',
          [LicenseLanguageKeys.LICENSES_FONTS]: 'Fonts',
          [LicenseLanguageKeys.LICENSES_NODE]: 'Libraries',
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
          [LicenseLanguageKeys.FONT_FONT]: 'Font',
          [LicenseLanguageKeys.FONT_LICENSE]: 'License',
          [LicenseLanguageKeys.FONT_AUTHOR]: 'Author',
          [LicenseLanguageKeys.FONT_LINK]: 'Link',
        },
      },
      logger,
    );
  }
}
