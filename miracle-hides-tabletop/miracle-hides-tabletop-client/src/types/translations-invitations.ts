import ITranslationsPage from './translations-page.interface';

export default interface ITranslationsInvitations extends ITranslationsPage {
  active: string;
  create: string;
  delete: string;
  notFound: string;
  toggleToActive: string;
  toggleToInactive: string;
  unspecificError: string;
  used: string;
}
