import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ITranslation,
  ITranslationService,
  TRANSLATION_SERVICE,
} from '../types/translation.types.gen';
import { LanguagePipe } from 'src/validation/language-pipe';

@Controller('api/v1/translations')
export class TranslationsController {
  constructor(
    @Inject(TRANSLATION_SERVICE)
    private readonly service: ITranslationService,
  ) {}
  @Get(':language')
  async base(
    @Param('language', new LanguagePipe()) language: string,
  ): Promise<ITranslation> {
    return this.service.readAsync(language);
  }
}
