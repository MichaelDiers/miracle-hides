import IHouseRule from './house-rule.interface';
import IServiceResult from './service-result.interface';

export default interface IHouseRulesServiceResult extends IServiceResult {
  headline?: string;
  houseRules?: IHouseRule[];
  language?: string;
}
