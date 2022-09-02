import { Schema } from 'mongoose';
import { displayNameSchemaEntry, IDisplayName } from '../base-types/display-name';
import { IIsDefault, isDefaultSchemaEntry } from '../base-types/is-default';
import { ILanguageInternalName, languageInternalNameSchemaEntry } from '../base-types/language-internal-name';

// used for di
export const LANGUAGES_SERVICE = 'LANGUAGES_SERVICE';

// used for di
export const LANGUAGES_DATABASE_SERVICE = 'LANGUAGES_DATABASE_SERVICE';

// used for di and specifies the collection name
export const LANGUAGE = 'language';

export type ILanguage = IDisplayName & IIsDefault & ILanguageInternalName;

export const LanguageSchema = new Schema({
  ...displayNameSchemaEntry(),
  ...isDefaultSchemaEntry(),
  ...languageInternalNameSchemaEntry(),
});

export interface ILanguagesService {
  read(): Promise<ILanguage[]>;
}

export interface ILanguagesDatabaseService {
  read(): Promise<ILanguage[]>;
}
