import { Schema } from 'mongoose';
import { descriptionsSchemaEntry, IDescriptions } from 'src/base-types/descriptions';
import { entryInfoSchemaEntry, IEntryInfo } from 'src/base-types/entry-info';
import { guidSchemaEntry, IGuid } from 'src/base-types/guid';
import { ILanguageInternalName, languageInternalNameSchemaEntry } from 'src/base-types/language-internal-name';
import { ITopic, topicSchemaEntry } from 'src/base-types/topic';

export type IHouseRuleEntry = 
  IDescriptions
  & IGuid
  & ITopic;

export type IHouseRuleEntryDatabase = 
  IHouseRuleEntry
  & IEntryInfo;

export interface IHouseRule extends ILanguageInternalName {
  houseRules: IHouseRuleEntry[];
}

export interface IHouseRuleDatabase extends ILanguageInternalName {
  houseRules: IHouseRuleEntryDatabase[];
}

export const HouseRuleEntrySchema = new Schema({
  ...descriptionsSchemaEntry(),
  ...entryInfoSchemaEntry(),
  ...guidSchemaEntry(),
  ...topicSchemaEntry(),
});

export const HouseRuleSchema = new Schema({
  ...languageInternalNameSchemaEntry(),
  houseRules: {
    _id: false,
    required: true,
    type: [HouseRuleEntrySchema],
  }
});

export interface IHouseRulesDatabaseService {
  readAsync(language: string): Promise<IHouseRuleDatabase>;
}

export interface IHouseRulesService {
  readAsync(language: string): Promise<IHouseRule>;
}

export const HOUSE_RULE = 'houseRule';

export const HOUSE_RULES_DATABASE_SERVICE = 'HOUSE_RULES_DATABASE_SERVICE';

export const HOUSE_RULES_SERVICE = 'HOUSE_RULES_SERVICE';
