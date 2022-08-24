import ITranslationsPage from './translations-page.interface';

export default interface ITranslationsInvitationsCreate extends ITranslationsPage {
  conflict: string;
  createAndDone: string;
  createAndNext: string;  
  unspecificError: string,
}
