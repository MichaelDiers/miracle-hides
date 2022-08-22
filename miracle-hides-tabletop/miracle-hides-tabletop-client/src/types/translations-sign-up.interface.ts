import ITranslationsPage from './translations-page.interface';

export default interface ITranslationsSignUp extends ITranslationsPage {
  cannotSignUp: string;
  userExists: string;
}
