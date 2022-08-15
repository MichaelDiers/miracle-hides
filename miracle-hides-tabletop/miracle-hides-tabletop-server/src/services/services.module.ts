import { Module } from '@nestjs/common';
import { SECRET_MANAGER_SERVICE } from 'src/types/secret-manager-service.interface';
import { HOUSE_RULES_SERVICE } from '../types/house-rules-service.interface';
import { HouseRulesService } from './house-rules/house-rules.service';
import { SecretManagerService } from './secret-manager/secret-manager.service';
import { MongodbConfigService } from './mongodb-config/mongodb-config.service';
import { HouseRulesDatabaseModule } from 'src/house-rules-database/house-rules-database.module';

@Module({
  exports: [HOUSE_RULES_SERVICE, SECRET_MANAGER_SERVICE],
  imports: [HouseRulesDatabaseModule],
  providers: [
    {
      provide: HOUSE_RULES_SERVICE,
      useClass: HouseRulesService,
    },
    {
      provide: SECRET_MANAGER_SERVICE,
      useClass: SecretManagerService,
    },
    MongodbConfigService,
  ]
})
export class ServicesModule {}
