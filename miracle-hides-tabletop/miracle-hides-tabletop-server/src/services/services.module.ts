import { Module } from '@nestjs/common';
import { ISecretManagerService, SECRET_MANAGER_SERVICE } from 'src/types/secret-manager-service.interface';
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
import { JwtService } from './jwt/jwt.service';
import { JWT_SERVICE } from 'src/types/jwt-service.interface';
import { UserInvitationsService } from './user-invitations/user-invitations.service';
import IJwtConfig from 'src/types/jwt-config.interface';
import { UserInvitationsDatabaseModule } from 'src/user-invitations-database/user-invitations-database.module';
import { USER_INVITATION_SERVICE } from 'src/types/user-invitations-service.interface';
import { MailerService } from './mailer/mailer.service';
import { MAILER_SERVICE } from 'src/types/services/mailer-service.interface';
import IMailerServiceConfig from 'src/types/services/mailer-service-config.interface';

@Module({
  exports: [
    HASH_SERVICE,
    HOUSE_RULES_SERVICE,
    JWT_SERVICE,
    LANGUAGES_SERVICE,
    SECRET_MANAGER_SERVICE,
    TRANSLATIONS_SERVICE,
    USER_SERVICE,
    USER_INVITATION_SERVICE,
    MAILER_SERVICE,
  ],
  imports: [
    HouseRulesDatabaseModule,
    LanguagesDatabaseModule,
    TranslationsDatabaseModule,
    UserDatabaseModule,
    UserInvitationsDatabaseModule,
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
      provide: JWT_SERVICE,
      useFactory: async (secretService: ISecretManagerService) => {
        const plainConfig = await secretService.getMiracleHidesTabletopJwtConfig();
        const config: IJwtConfig = JSON.parse(plainConfig);
        return new JwtService(config);
      },
      inject: [SECRET_MANAGER_SERVICE],
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
