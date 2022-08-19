import ITranslationsHome from './translations-home.interface';
import ITranslationsHouseRules from './translations-house-rules.interface';
import ITranslationsLanguages from './translations-languages.interface';
import ITranslationsNavbar from './translations-navbar.interface';

export default interface ITranslations {
  home: ITranslationsHome;
  houseRules: ITranslationsHouseRules;
  languages: ITranslationsLanguages;
  navbar: ITranslationsNavbar;
  language: string;  
}
