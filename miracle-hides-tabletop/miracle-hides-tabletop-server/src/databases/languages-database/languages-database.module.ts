import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LANGUAGE,
  LanguageSchema,
  LANGUAGES_DATABASE_SERVICE,
} from '../../types/language.types';
import { LanguagesDatabaseService } from './languages-database.service';

@Module({
  exports: [LANGUAGES_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: LANGUAGE, schema: LanguageSchema },
    ]),
  ],
  providers: [
    {
      provide: LANGUAGES_DATABASE_SERVICE,
      useClass: LanguagesDatabaseService,
    },
  ],
})
export class LanguagesDatabaseModule {}
