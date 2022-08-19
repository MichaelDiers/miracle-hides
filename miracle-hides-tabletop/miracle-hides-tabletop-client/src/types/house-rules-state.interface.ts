import IHouseRule from './house-rule.interface';

export default interface IHouseRulesState {
  houseRules?: IHouseRule[];
  language?: string;
  error?: string;
  isLoading: boolean;
}
