import { IsIn, IsString } from 'class-validator';
import { internalNameSchemaEntry } from './internal-name';

export const LANGUAGES = ['de', 'en'];

export const languageInternalNameSchemaEntry = () => internalNameSchemaEntry(LANGUAGES);

export interface ILanguageInternalName {
  internalName: string;
}

export class LanguageInternalNameDto implements ILanguageInternalName {
  @IsString()
  @IsIn(LANGUAGES)
  internalName: string;
}
