import { Inject, Injectable } from '@nestjs/common';
import * as houseRuleTypes from '../../types/house-rule.types';

@Injectable()
export class HouseRulesService implements houseRuleTypes.IHouseRulesService {
  constructor(
    @Inject(houseRuleTypes.HOUSE_RULES_DATABASE_SERVICE)
    private readonly houseRulesDatabaseService: houseRuleTypes.IHouseRulesDatabaseService,
  ) {}

  async readAsync(language: string): Promise<houseRuleTypes.IHouseRule> {
    const result = await this.houseRulesDatabaseService.readAsync(language);
    if (!result) {
      return;
    }

    return {
      houseRules: result.houseRules.map(
        ({descriptions, guid, topic }) => ({ descriptions, guid, topic })),
      languageInternalName: result.languageInternalName,
    };
  }
}
