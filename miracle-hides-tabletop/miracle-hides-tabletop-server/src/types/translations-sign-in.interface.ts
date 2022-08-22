import ITranslationsPage from './translations-page.interface';

export default interface ITranslationsSignIn extends ITranslationsPage {
  cannotSignIn: string;
  unknownUser: string;
}
