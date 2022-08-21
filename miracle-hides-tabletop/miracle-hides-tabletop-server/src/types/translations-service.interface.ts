import ITranslations from './translations.interface';

export interface ITranslationsService {
  readAsync(language: string): Promise<ITranslations>;
}

export const TRANSLATIONS_SERVICE = 'TRANSLATIONS_SERVICE';
