import { HouseRules } from 'src/house-rules-database/house-rules.schema';

export interface IHouseRulesDatabaseService {
  read(language: string): Promise<HouseRules|null>;
}

export const HOUSE_RULES_DATABASE_SERVICE = 'HOUSE_RULES_DATABASE_SERVICE';
