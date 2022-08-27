import { IDisplayName } from '../base-types/display-name';
import { IIsDefault } from '../base-types/is-default';
import { ILanguageInternalName } from '../base-types/language-internal-name';

export type ILanguage = IDisplayName & IIsDefault & ILanguageInternalName;
