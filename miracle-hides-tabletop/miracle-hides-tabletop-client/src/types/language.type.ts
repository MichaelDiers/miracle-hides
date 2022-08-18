export type Language = 'en';

const LANGUAGES = ['en'];

export const defaultLanguage: Language = LANGUAGES[0] as Language;

export function toLanguageOrDefault(...languages: string[]) : Language {
  const lang  = languages.map((value) => value.split('-')[0]).find((language) => {
    return LANGUAGES.find((l) => l.toLowerCase() === language.toLowerCase());
  });

  return (lang || defaultLanguage) as Language;
}

export function normalizeLanguage(language: string): Language | undefined {
  if (!language) {
    return;
  }

  return language.split('-')[0].toLocaleLowerCase() as Language;
}
