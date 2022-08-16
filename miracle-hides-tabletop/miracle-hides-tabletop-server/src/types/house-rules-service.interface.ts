import { Language } from './language.type';
import IReadHouseRulesResult from './read-house-rules-result.interface';

export interface IHouseRulesService {
  readAsync(language: Language): Promise<IReadHouseRulesResult | null>;
}

export const HOUSE_RULES_SERVICE = 'HOUSE_RULES_SERVICE';
