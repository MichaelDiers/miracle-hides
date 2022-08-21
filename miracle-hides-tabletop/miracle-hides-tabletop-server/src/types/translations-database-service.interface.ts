import ITranslations from './translations.interface';

export interface ITranslationsDatabaseService {
  readAsync(language: string): Promise<ITranslations>;
}

export const TRANSLATIONS_DATABASE_SERVICE = 'TRANSLATIONS_DATABASE_SERVICE';
