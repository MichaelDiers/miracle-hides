import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { HouseRulesController } from './house-rules.controller';
import { LanguageController } from './language.controller';

@Module({
  controllers: [HouseRulesController, LanguageController],
  imports: [ServicesModule],
})
export class ControllersModule {}
