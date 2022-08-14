import { Module } from '@nestjs/common';
import { HOUSE_RULES_SERVICE } from '../types/house-rule-service.interface';
import { HouseRulesServiceService } from './house-rules-service/house-rules-service.service';

@Module({
  exports: [HOUSE_RULES_SERVICE],
  providers: [
    {
      provide: HOUSE_RULES_SERVICE,
      useClass: HouseRulesServiceService,
    },
  ]
})
export class ServicesModule {}
