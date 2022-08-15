import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHouseRulesDatabaseService } from '../types/house-rules-database-service.interface';
import { HouseRules, HouseRulesDocument } from './house-rules.schema';

@Injectable()
export class HouseRulesDatabaseService implements IHouseRulesDatabaseService {
  constructor(
    @InjectModel(HouseRules.name) private houseRulesModel: Model<HouseRulesDocument>,
  ) {}

  async read(language: string): Promise<HouseRules|null> {
    return this.houseRulesModel.findOne({ language: language.toUpperCase() }).exec();
  }
}
