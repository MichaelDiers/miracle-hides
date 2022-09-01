import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as houseRuleTypes  from '../../types/house-rule.types';

@Injectable()
export class HouseRulesDatabaseService implements houseRuleTypes.IHouseRulesDatabaseService {
  constructor(
    @InjectModel(houseRuleTypes.HOUSE_RULE)
    private houseRulesModel: Model<houseRuleTypes.IHouseRuleDatabase>,
  ) {}

  async readAsync(language: string): Promise<houseRuleTypes.IHouseRuleDatabase> {
    const result = await this.houseRulesModel
      .findOne({ languageInternalName: language.toLowerCase() })
      .exec();
    if (!result) {
      return;
    }

    return {
      languageInternalName: result.languageInternalName,
      houseRules: result.houseRules,
    };
  }
}
