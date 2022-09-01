import { IDescriptions } from '../base-types/descriptions';
import { IGuid } from '../base-types/guid';
import { ILanguageInternalName  } from '../base-types/language-internal-name';
import { ITopic } from '../base-types/topic';

export type IHouseRuleEntry = 
  IDescriptions
  & IGuid
  & ITopic;

export interface IHouseRule extends ILanguageInternalName {
  houseRules: IHouseRuleEntry[];
}
