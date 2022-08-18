import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IHouseRules from 'src/types/house-rules.interface';
import { IHouseRulesDatabaseService } from '../types/house-rules-database-service.interface';
import { HouseRules, HouseRulesDocument } from './house-rules.schema';

@Injectable()
export class HouseRulesDatabaseService implements IHouseRulesDatabaseService {
  constructor(
    @InjectModel(HouseRules.name)
    private houseRulesModel: Model<HouseRulesDocument>,
  ) {}

  async readAsync(language: string): Promise<IHouseRules> {
    const result = await this.houseRulesModel
      .findOne({ language: language.toLowerCase() })
      .exec();
    if (!result) {
      return;
    }

    return {
      language: result.language,
      houseRules: result.houseRules,
      headline: result.headline,
    };
  }
}
