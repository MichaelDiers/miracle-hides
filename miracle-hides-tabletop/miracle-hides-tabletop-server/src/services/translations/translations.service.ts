import { Inject, Injectable } from '@nestjs/common';
import {
  ITranslation,
  ITranslationDatabaseService,
  ITranslationService,
  TRANSLATION_DATABASE_SERVICE,
} from '../../types/translation.types.gen';

@Injectable()
export class TranslationService implements ITranslationService {
  constructor(
    @Inject(TRANSLATION_DATABASE_SERVICE)
    private readonly service: ITranslationDatabaseService,
  ) {}
  async readAsync(language: string): Promise<ITranslation> {
    return this.service.readAsync(language);
  }
}
