import { Inject, Injectable } from '@nestjs/common';
import { ILanguage } from 'src/types/language.type';
import {
  ILanguagesDatabaseService,
  LANGUAGES_DATABASE_SERVICE,
} from 'src/types/languages-database-service.interface';
import { ILanguagesService } from 'src/types/languages-service.interface';

@Injectable()
export class LanguagesService implements ILanguagesService {
  constructor(
    @Inject(LANGUAGES_DATABASE_SERVICE)
    private readonly database: ILanguagesDatabaseService,
  ) {}

  async read(): Promise<ILanguage[]> {
    const results = await this.database.read();
    if (!results) {
      return;
    }

    // check if more than one default language exists and reduce to one is necessary
    const defaultLanguages = results.filter(({ isDefault }) => isDefault);
    switch (defaultLanguages.length) {
      case 0:
        results[0].isDefault = true;
        return results;
      case 1:
        return results;
      default:
        return results.map((result) => ({
          ...result,
          isDefault: result.short === defaultLanguages[0].short,
        }));
    }
  }
}
