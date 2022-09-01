import { Module } from '@nestjs/common';
import { ISecretManagerService, SECRET_MANAGER_SERVICE } from 'src/types/secret-manager-service.interface';
import { HOUSE_RULES_SERVICE } from '../types/house-rule.types';
import { HouseRulesService } from './house-rules/house-rules.service';
import { SecretManagerService } from './secret-manager/secret-manager.service';
import { MongodbConfigService } from './mongodb-config/mongodb-config.service';
import { HouseRulesDatabaseModule } from '../databases/house-rules-database/house-rules-database.module';
import { LanguagesService } from './languages/languages.service';
import { LANGUAGES_SERVICE } from '../types/language.types';
import { LanguagesDatabaseModule } from '../databases/languages-database/languages-database.module';
import { UserService } from './user/user.service';
import { UserDatabaseModule } from '../databases/user-database/user-database.module';
import { USER_SERVICE } from '../types/user.types';
import { DEFAULT_HASH_SERVICE_ROUNDS, HashService, HASH_SERVICE_ROUNDS } from './hash/hash.service';
import { HASH_SERVICE } from 'src/types/hash-service.interface';
import { JwtService } from './jwt/jwt.service';
import { JWT_SERVICE } from 'src/types/jwt-service.interface';
import { UserInvitationsService } from './user-invitations/user-invitations.service';
import IJwtConfig from 'src/types/jwt-config.interface';
import { MailerService } from './mailer/mailer.service';
import { MAILER_SERVICE } from 'src/types/services/mailer-service.interface';
import IMailerServiceConfig from 'src/types/services/mailer-service-config.interface';
import { TRANSLATION_SERVICE } from '../types/translation.types.gen';
import { TranslationDatabaseModule } from 'src/databases/translation-database/translation-database.module';
import { TranslationService } from './translations/translations.service';
import { TransactionsModule } from 'src/databases/transactions/transactions.module';
import { USER_INVITATION_SERVICE } from 'src/types/user-invitations.types';
import { UserInvitationsDatabaseModule } from 'src/databases/user-invitations-database/user-invitations-database.module';

@Module({
  exports: [
    HASH_SERVICE,
    HOUSE_RULES_SERVICE,
    JWT_SERVICE,
    LANGUAGES_SERVICE,
    SECRET_MANAGER_SERVICE,
    TRANSLATION_SERVICE,
    USER_SERVICE,
    USER_INVITATION_SERVICE,
    MAILER_SERVICE,
  ],
  imports: [
    HouseRulesDatabaseModule,
    LanguagesDatabaseModule,
    TransactionsModule,
    TranslationDatabaseModule,
    UserDatabaseModule,
    UserInvitationsDatabaseModule,
  ],
  providers: [
    {
      provide: LANGUAGES_SERVICE,
      useClass: LanguagesService,
    },

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
      provide: JWT_SERVICE,
      useFactory: async (secretService: ISecretManagerService) => {
        const plainConfig = await secretService.getMiracleHidesTabletopJwtConfig();
        const config: IJwtConfig = JSON.parse(plainConfig);
        return new JwtService(config);
      },
      inject: [SECRET_MANAGER_SERVICE],
    },
    {
      provide: SECRET_MANAGER_SERVICE,
      useClass: SecretManagerService,
    },
    {
      provide: TRANSLATION_SERVICE,
      useClass: TranslationService,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_INVITATION_SERVICE,
      useClass: UserInvitationsService,
    },
    {
      provide: MAILER_SERVICE,
      useFactory: async (secretService: ISecretManagerService) => {
        const plainConfig = await secretService.getMiracleHidesTabletopMailerConfig();
        const config: IMailerServiceConfig = JSON.parse(plainConfig);
        return new MailerService(config);
      },
      inject: [SECRET_MANAGER_SERVICE],
    },
    MongodbConfigService,
  ],
})
export class ServicesModule {}
