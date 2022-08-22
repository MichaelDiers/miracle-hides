import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITranslationsDatabaseService } from 'src/types/translations-database-service.interface';
import ITranslations from 'src/types/translations.interface';
import { Translation, TranslationDocument } from './translation.schema';

@Injectable()
export class TranslationsDatabaseService
  implements ITranslationsDatabaseService
{
  constructor(
    @InjectModel(Translation.name)
    private translationModel: Model<TranslationDocument>,
  ) {}

  async readAsync(language: string): Promise<ITranslations> {
    const result = await this.translationModel.findOne({ language }).exec();
    if (!result) {
      return;
    }

    return {
      dashboard: result.dashboard,
      home: result.home,
      houseRules: result.houseRules,
      language: result.language,
      languages: result.languages,
      navbar: result.navbar,
      signIn: result.signIn,
      signUp: result.signUp,
      userForm: result.userForm,
      validation: result.validation,
    };
  }
}
