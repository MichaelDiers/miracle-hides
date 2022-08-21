import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ITranslationsService,
  TRANSLATIONS_SERVICE,
} from 'src/types/translations-service.interface';
import ITranslations from 'src/types/translations.interface';
import { LanguagePipe } from 'src/validation/language-pipe';

@Controller('api/translations')
export class TranslationsController {
  constructor(
    @Inject(TRANSLATIONS_SERVICE)
    private readonly service: ITranslationsService,
  ) {}
  @Get(':language')
  async base(
    @Param('language', new LanguagePipe()) language: string,
  ): Promise<ITranslations> {
    return this.service.readAsync(language);
  }
}
