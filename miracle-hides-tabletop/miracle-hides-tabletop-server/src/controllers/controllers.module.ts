import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { HouseRulesController } from './house-rules.controller';
import { LanguageController } from './language.controller';
import { TranslationsController } from './translations.controller';
import { SignInController } from './sign-in.controller';
import { SignUpController } from './sign-up.controller';
import { UserInvitationsController } from './user-invitations.controller';

@Module({
  controllers: [
    HouseRulesController,
    LanguageController,
    TranslationsController,
    SignInController,
    SignUpController,
    UserInvitationsController,
  ],
  imports: [ServicesModule],
})
export class ControllersModule {}
