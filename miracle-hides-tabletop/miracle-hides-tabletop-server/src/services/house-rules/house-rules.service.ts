import { Inject, Injectable } from '@nestjs/common';
import {
  HOUSE_RULES_DATABASE_SERVICE,
  IHouseRulesDatabaseService,
} from 'src/types/house-rules-database-service.interface';
import { IHouseRulesService } from '../../types/house-rules-service.interface';
import { Language } from '../../types/language.type';
import IReadHouseRulesResult from '../../types/read-house-rules-result.interface';

@Injectable()
export class HouseRulesService implements IHouseRulesService {
  constructor(
    @Inject(HOUSE_RULES_DATABASE_SERVICE)
    private readonly houseRulesDatabaseService: IHouseRulesDatabaseService,
  ) {}

  readAsync(language: Language): Promise<IReadHouseRulesResult | null> {
    return new Promise((resolve, reject) => {
      this.houseRulesDatabaseService
        .read(language)
        .then((result) => {
          if (!result) {
            reject('not found');
          }

          resolve(result as IReadHouseRulesResult);
        })
        .catch((err) => {
          console.error('here', err);
          reject('not found');
        });
    });
  }
}
