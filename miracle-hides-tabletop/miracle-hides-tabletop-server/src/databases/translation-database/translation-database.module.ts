import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TRANSLATION_DATABASE_SERVICE } from '../../types/translation.types.gen';
import { Translation, TranslationSchema } from './translation.schema.gen';
import { TranslationDatabaseService } from './translation-database.service.gen';

@Module({
  exports: [TRANSLATION_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: Translation.name, schema: TranslationSchema },
    ]),
  ],
  providers: [
    {
      provide: TRANSLATION_DATABASE_SERVICE,
      useClass: TranslationDatabaseService,
    },
  ],
})
export class TranslationDatabaseModule {}
