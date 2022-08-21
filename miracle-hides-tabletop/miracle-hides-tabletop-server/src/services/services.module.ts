import { Module } from '@nestjs/common';
import { SECRET_MANAGER_SERVICE } from 'src/types/secret-manager-service.interface';
import { HOUSE_RULES_SERVICE } from '../types/house-rules-service.interface';
import { HouseRulesService } from './house-rules/house-rules.service';
import { SecretManagerService } from './secret-manager/secret-manager.service';
import { MongodbConfigService } from './mongodb-config/mongodb-config.service';
import { HouseRulesDatabaseModule } from 'src/house-rules-database/house-rules-database.module';
import { LanguagesService } from './languages/languages.service';
import { LANGUAGES_SERVICE } from 'src/types/languages-service.interface';
import { LanguagesDatabaseModule } from 'src/languages-database/languages-database.module';
import { TranslationsService } from './translations/translations.service';
import { TRANSLATIONS_SERVICE } from 'src/types/translations-service.interface';
import { TranslationsDatabaseModule } from 'src/translations-database/translations-database.module';

@Module({
  exports: [
    HOUSE_RULES_SERVICE,
    LANGUAGES_SERVICE,
    SECRET_MANAGER_SERVICE,
    TRANSLATIONS_SERVICE,
  ],
  imports: [
    HouseRulesDatabaseModule,
    LanguagesDatabaseModule,
    TranslationsDatabaseModule,
  ],
  providers: [
    {
      provide: HOUSE_RULES_SERVICE,
      useClass: HouseRulesService,
    },
    {
      provide: LANGUAGES_SERVICE,
      useClass: LanguagesService,
    },
    {
      provide: SECRET_MANAGER_SERVICE,
      useClass: SecretManagerService,
    },
    {
      provide: TRANSLATIONS_SERVICE,
      useClass: TranslationsService,
    },
    MongodbConfigService,
  ],
})
export class ServicesModule {}
