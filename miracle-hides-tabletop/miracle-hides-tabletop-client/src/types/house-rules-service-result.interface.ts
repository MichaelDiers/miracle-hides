import IHouseRule from './house-rule.interface';

export default interface IHouseRulesServiceResult {
  houseRules?: IHouseRule[];
  language?: string;
}
