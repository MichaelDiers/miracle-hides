import IHouseRules from './house-rules.interface';

export interface IHouseRulesService {
  readAsync(language: string): Promise<IHouseRules>;
}

export const HOUSE_RULES_SERVICE = 'HOUSE_RULES_SERVICE';
