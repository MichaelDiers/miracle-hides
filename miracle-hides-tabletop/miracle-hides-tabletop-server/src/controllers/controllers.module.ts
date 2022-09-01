import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { HouseRulesController } from './house-rules.controller';
import { LanguageController } from './language.controller';
import { TranslationsController } from './translations.controller';
import { UserInvitationsController } from './user-invitations.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [
    HouseRulesController,
    LanguageController,
    TranslationsController,
    UserInvitationsController,
    UserController,
  ],
  imports: [ServicesModule],
})
export class ControllersModule {}
