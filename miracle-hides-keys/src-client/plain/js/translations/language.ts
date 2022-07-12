import { AsymmetricLanguage } from './language-asymmetric';
import { FooterLanguage } from './language-footer';
import { HeaderLanguage } from './language-header';
import { SymmetricLanguage } from './language-symmetric';

export default interface Language {
  asymmetricPage: AsymmetricLanguage;
  footerPage: FooterLanguage;
  headerPage: HeaderLanguage;
  symmetricPage: SymmetricLanguage;
}
