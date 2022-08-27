/**
 * Do not edit generated files!
**/
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITranslation, ITranslationDatabaseService } from '../../types/translation.types.gen';
import { Translation, TranslationDocument } from './translation.schema.gen';

@Injectable()
export class TranslationDatabaseService
	implements ITranslationDatabaseService
{
	constructor(
		@InjectModel(Translation.name)
		private translationModel: Model<TranslationDocument>,
	) {}

	async readAsync(language: string): Promise<ITranslation> {
		const result = await this.translationModel.findOne({ language }).exec();
		if (!result) {
			return;
		}

		return {
			common: result.common,
			dashboard: result.dashboard,
			home: result.home,
			houseRules: result.houseRules,
			invitations: result.invitations,
			invitationsCreate: result.invitationsCreate,
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
