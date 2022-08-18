import { Controller, Get, Inject } from '@nestjs/common';
import { ILanguage } from 'src/types/language.type';
import {
  ILanguagesService,
  LANGUAGES_SERVICE,
} from 'src/types/languages-service.interface';

@Controller('api/languages')
export class LanguageController {
  constructor(
    @Inject(LANGUAGES_SERVICE) private readonly service: ILanguagesService,
  ) {}

  @Get()
  async languages(): Promise<ILanguage[]> {
    return this.service.read();
  }
}
