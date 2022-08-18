import { ILanguage } from './language.type';

export interface ILanguagesDatabaseService {
  read(): Promise<ILanguage[]>;
}

export const LANGUAGES_DATABASE_SERVICE = 'LANGUAGES_DATABASE_SERVICE';
