import PageEvents from '../pages/page-events';
import { AsymmetricLanguage } from './language-asymmetric';
import { CommonLanguage, COMMON_LANGUAGE_SOURCE } from './language-common';
import { FooterLanguage } from './language-footer';
import { HeaderLanguage } from './language-header';
import { LicenseLanguage } from './language-license';
import { SymmetricLanguage } from './language-symmetric';

export interface Language {
  [PageEvents.ASYMMETRIC_PAGE]: AsymmetricLanguage;
  [COMMON_LANGUAGE_SOURCE]: CommonLanguage;
  [PageEvents.FOOTER_PAGE]: FooterLanguage;
  [PageEvents.HEADER_PAGE]: HeaderLanguage;
  [PageEvents.SYMMETRIC_PAGE]: SymmetricLanguage;
  [PageEvents.LICENSE_PAGE]: LicenseLanguage;
}
