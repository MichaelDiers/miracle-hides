import IHouseRules from './house-rules.interface';

export interface IHouseRulesDatabaseService {
  readAsync(language: string): Promise<IHouseRules>;
}

export const HOUSE_RULES_DATABASE_SERVICE = 'HOUSE_RULES_DATABASE_SERVICE';
