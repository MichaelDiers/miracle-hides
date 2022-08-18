import { ILanguage } from './language.type';

export interface ILanguagesService {
  read(): Promise<ILanguage[]>;
}

export const LANGUAGES_SERVICE = 'LANGUAGES_SERVICE';
