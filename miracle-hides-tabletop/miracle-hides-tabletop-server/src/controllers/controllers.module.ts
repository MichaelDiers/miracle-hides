import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { HouseRulesController } from './house-rules.controller';
import { LanguageController } from './language.controller';
import { TranslationsController } from './translations.controller';

@Module({
  controllers: [HouseRulesController, LanguageController, TranslationsController],
  imports: [ServicesModule],
})
export class ControllersModule {}
