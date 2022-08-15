import IHouseRule from './house-rule.interface';

export default interface IHouseRulesServiceResult {
  headline?: string;
  houseRules?: IHouseRule[];
  error?: string;
}
