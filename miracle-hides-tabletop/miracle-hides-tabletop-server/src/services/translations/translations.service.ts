import { Inject, Injectable } from '@nestjs/common';
import {
  ITranslationsDatabaseService,
  TRANSLATIONS_DATABASE_SERVICE,
} from 'src/types/translations-database-service.interface';
import { ITranslationsService } from 'src/types/translations-service.interface';
import ITranslations from 'src/types/translations.interface';

@Injectable()
export class TranslationsService implements ITranslationsService {
  constructor(
    @Inject(TRANSLATIONS_DATABASE_SERVICE)
    private readonly service: ITranslationsDatabaseService,
  ) {}
  async readAsync(language: string): Promise<ITranslations> {
    return this.service.readAsync(language);
  }
}
