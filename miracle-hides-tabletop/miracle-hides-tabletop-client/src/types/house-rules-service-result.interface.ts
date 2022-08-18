import IHouseRule from './house-rule.interface';
import { Language } from './language.type';

export default interface IHouseRulesServiceResult {
  headline?: string;
  houseRules?: IHouseRule[];
  error?: string;
  language?: Language;
}
