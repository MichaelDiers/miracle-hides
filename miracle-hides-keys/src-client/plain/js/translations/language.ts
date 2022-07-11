import { AsymmetricLanguage } from './language-asymmetric';
import { SymmetricLanguage } from './language-symmetric';

export default interface Language {
  asymmetricPage: AsymmetricLanguage;
  symmetricPage: SymmetricLanguage;
}
