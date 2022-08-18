import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILanguage } from 'src/types/language.type';
import { ILanguagesDatabaseService } from 'src/types/languages-database-service.interface';
import { Language, LanguageDocument } from './language.schema';

@Injectable()
export class LanguagesDatabaseService implements ILanguagesDatabaseService {
  constructor(
    @InjectModel(Language.name)
    private languageModel: Model<LanguageDocument>,
  ) {}

  async read(): Promise<ILanguage[]> {
    const result = await this.languageModel.find().exec();
    if (!result) {
      return;
    }

    return result.map(({ name, isDefault, short }) => ({
      name,
      isDefault,
      short,
    }));
  }
}
