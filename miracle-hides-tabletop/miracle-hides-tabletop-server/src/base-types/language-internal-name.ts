import { IsIn, IsString } from 'class-validator';
import { internalNameSchemaEntry } from './internal-name';

export const LANGUAGES = ['de', 'en'];

export const languageInternalNameSchemaEntry = () => internalNameSchemaEntry({
  namePrefix: 'language',
  stringEnum: LANGUAGES,
});

export interface ILanguageInternalName {
  languageInternalName: string;
}

export class LanguageInternalNameDto implements ILanguageInternalName {
  @IsString()
  @IsIn(LANGUAGES)
  languageInternalName: string;
}
