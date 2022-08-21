import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TRANSLATIONS_DATABASE_SERVICE } from 'src/types/translations-database-service.interface';
import { Translation, TranslationSchema } from './translation.schema';
import { TranslationsDatabaseService } from './translations-database.service';

@Module({
  exports: [TRANSLATIONS_DATABASE_SERVICE],
  imports: [
    MongooseModule.forFeature([
      { name: Translation.name, schema: TranslationSchema },
    ]),
  ],
  providers: [
    {
      provide: TRANSLATIONS_DATABASE_SERVICE,
      useClass: TranslationsDatabaseService,
    },
  ],
})
export class TranslationsDatabaseModule {}
