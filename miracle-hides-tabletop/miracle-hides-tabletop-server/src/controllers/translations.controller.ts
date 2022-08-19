import { Controller, Get, Param } from '@nestjs/common';
import ITranslations from 'src/types/translations.interface';

@Controller('api/translations')
export class TranslationsController {
  @Get(':language')
  async base(@Param('language') language: string): Promise<ITranslations> {
    switch(language.toUpperCase()) {
      case 'EN':
        return {
          language,
          home: {
            headline: 'One dice to rule them all!',
          },
          houseRules: {
            headline: 'House Rules',
          },
          languages: {
            headline: 'Languages',
          },
          navbar: {
            home: 'Home',
            houseRules: 'House Rules',
            languages: 'Languages',
          },
        };
      case 'DE':
        return {
          language,
          home: {
            headline: 'Ein Würfel sie zu knechten...',
          },
          houseRules: {
            headline: 'Hausregeln',
          },
          languages: {
            headline: 'Sprachen',
          },
          navbar: {
            home: 'Home',
            houseRules: 'Hausregeln',
            languages: 'Sprachen',
          },
        };
      default:
        return;
    }
  }
}
