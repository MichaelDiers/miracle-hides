import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILanguage, LANGUAGE, ILanguagesDatabaseService } from '../../types/language.types';

@Injectable()
export class LanguagesDatabaseService implements ILanguagesDatabaseService {
  constructor(
    @InjectModel(LANGUAGE)
    private languageModel: Model<ILanguage>,
  ) {}

  async read(): Promise<ILanguage[]> {
    const result: ILanguage[] = await this.languageModel.find().exec();
    if (!result) {
      return;
    }

    const languages: ILanguage[] = result.map(({ displayName, languageInternalName, isDefault }) => ({
      displayName,
      languageInternalName,
      isDefault,
    }));

    return languages;
  }
}
