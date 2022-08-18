import { Inject, Injectable } from '@nestjs/common';
import {
  HOUSE_RULES_DATABASE_SERVICE,
  IHouseRulesDatabaseService,
} from 'src/types/house-rules-database-service.interface';
import IHouseRules from 'src/types/house-rules.interface';
import { IHouseRulesService } from '../../types/house-rules-service.interface';

@Injectable()
export class HouseRulesService implements IHouseRulesService {
  constructor(
    @Inject(HOUSE_RULES_DATABASE_SERVICE)
    private readonly houseRulesDatabaseService: IHouseRulesDatabaseService,
  ) {}

  readAsync(language: string): Promise<IHouseRules> {
    return this.houseRulesDatabaseService.readAsync(language);
  }
}
