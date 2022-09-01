import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as houseRuleTypes from '../../types/house-rule.types';
import { HouseRulesDatabaseService } from './house-rules-database.service';

@Module({
  exports: [houseRuleTypes.HOUSE_RULES_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: houseRuleTypes.HOUSE_RULE, schema: houseRuleTypes.HouseRuleSchema },
    ]),
  ],
  providers: [
    {
      provide: houseRuleTypes.HOUSE_RULES_DATABASE_SERVICE,
      useClass: HouseRulesDatabaseService,
    },
  ],
})
export class HouseRulesDatabaseModule {}
