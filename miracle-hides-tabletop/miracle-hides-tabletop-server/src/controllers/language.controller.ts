import { Controller, Get, Inject } from '@nestjs/common';
import {
  ILanguage,
  ILanguagesService,
  LANGUAGES_SERVICE,
} from '../types/language.types';

@Controller('api/v1/languages')
export class LanguageController {
  constructor(
    @Inject(LANGUAGES_SERVICE) private readonly service: ILanguagesService,
  ) {}

  @Get()
  async languages(): Promise<ILanguage[]> {
    return this.service.read();
  }
}
