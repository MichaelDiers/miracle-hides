import { Language } from './language.type';
import IListHouseRulesResult from './list-house-rules-result.interface';

export interface IHouseRulesService {
  listAsync(language: Language) : Promise<IListHouseRulesResult>;
}

export const HOUSE_RULES_SERVICE = 'HOUSE_RULES_SERVICE';
