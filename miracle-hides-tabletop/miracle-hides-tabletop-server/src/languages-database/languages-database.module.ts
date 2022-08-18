import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LANGUAGES_DATABASE_SERVICE } from 'src/types/languages-database-service.interface';
import { Language, LanguageSchema } from './language.schema';
import { LanguagesDatabaseService } from './languages-database.service';

@Module({
  exports: [LANGUAGES_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
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
