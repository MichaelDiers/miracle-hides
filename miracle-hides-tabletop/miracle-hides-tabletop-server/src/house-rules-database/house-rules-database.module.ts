import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseRule, HouseRuleSchema } from './house-rule.schema';
import { HouseRules, HouseRulesSchema } from './house-rules.schema';
import { HouseRulesDatabaseService } from './house-rules-database.service';
import { HOUSE_RULES_DATABASE_SERVICE } from 'src/types/house-rules-database-service.interface';

@Module({
  exports: [HOUSE_RULES_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: HouseRule.name, schema: HouseRuleSchema },
      { name: HouseRules.name, schema: HouseRulesSchema },
    ]),
  ],
  providers: [
    {
      provide: HOUSE_RULES_DATABASE_SERVICE,
      useClass: HouseRulesDatabaseService,
    },
  ],
})
export class HouseRulesDatabaseModule {}
