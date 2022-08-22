import ITranslationsDashboard from './translations-dashboard.interface';
import ITranslationsHome from './translations-home.interface';
import ITranslationsHouseRules from './translations-house-rules.interface';
import ITranslationsLanguages from './translations-languages.interface';
import ITranslationsNavbar from './translations-navbar.interface';
import ITranslationsSignIn from './translations-sign-in.interface';
import ITranslationsSignUp from './translations-sign-up.interface';
import ITranslationsUserForm from './translations-user-form.interface';
import ITranslationsValidation from './translations-validation';

export default interface ITranslations {
  dashboard: ITranslationsDashboard;
  home: ITranslationsHome;
  houseRules: ITranslationsHouseRules;
  languages: ITranslationsLanguages;
  navbar: ITranslationsNavbar;
  language: string;
  signIn: ITranslationsSignIn;
  signUp: ITranslationsSignUp;
  userForm: ITranslationsUserForm;
  validation: ITranslationsValidation;
}
