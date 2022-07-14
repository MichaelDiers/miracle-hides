import { AsymmetricLanguage } from './language-asymmetric';
import { CommonLanguage } from './language-common';
import { FooterLanguage } from './language-footer';
import { HeaderLanguage } from './language-header';
import { SymmetricLanguage } from './language-symmetric';

export const COMMON_SOURCE = 'common';

export interface Language {
  asymmetricPage: AsymmetricLanguage;
  [COMMON_SOURCE]: CommonLanguage;
  footerPage: FooterLanguage;
  headerPage: HeaderLanguage;
  symmetricPage: SymmetricLanguage;
}
