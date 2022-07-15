import { AsymmetricPageEvent } from '../pages/asymmetric.page';
import { FooterPageEvent } from '../pages/footer.page';
import { HeaderPageEvent } from '../pages/header.page';
import { LicensePageEvent } from '../pages/license-page';
import { SymmetricPageEvent } from '../pages/symmetric.page';
import { AsymmetricLanguage } from './language-asymmetric';
import { CommonLanguage, COMMON_LANGUAGE_SOURCE } from './language-common';
import { FooterLanguage } from './language-footer';
import { HeaderLanguage } from './language-header';
import { LicenseLanguage } from './language-license';
import { SymmetricLanguage } from './language-symmetric';

export interface Language {  
  [AsymmetricPageEvent]: AsymmetricLanguage;
  [COMMON_LANGUAGE_SOURCE]: CommonLanguage;
  [FooterPageEvent]: FooterLanguage;
  [HeaderPageEvent]: HeaderLanguage;
  [SymmetricPageEvent]: SymmetricLanguage;
  [LicensePageEvent]: LicenseLanguage;
}
