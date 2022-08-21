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
import { UserService } from './user/user.service';
import { UserDatabaseModule } from 'src/user-database/user-database.module';
import { USER_SERVICE } from 'src/types/user-service.interface';
import { DEFAULT_HASH_SERVICE_ROUNDS, HashService, HASH_SERVICE_ROUNDS } from './hash/hash.service';
import { HASH_SERVICE } from 'src/types/hash-service.interface';

@Module({
  exports: [
    HASH_SERVICE,
    HOUSE_RULES_SERVICE,
    LANGUAGES_SERVICE,
    SECRET_MANAGER_SERVICE,
    TRANSLATIONS_SERVICE,
    USER_SERVICE,
  ],
  imports: [
    HouseRulesDatabaseModule,
    LanguagesDatabaseModule,
    TranslationsDatabaseModule,
    UserDatabaseModule,
  ],
  providers: [
    {
      provide: HASH_SERVICE_ROUNDS,
      useValue: DEFAULT_HASH_SERVICE_ROUNDS,
    },
    {
      provide: HASH_SERVICE,
      useFactory: (rounds: number) => new HashService(rounds),
      inject: [HASH_SERVICE_ROUNDS],
    },
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
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    MongodbConfigService,
  ],
})
export class ServicesModule {}
