import IHouseRule from './house-rule.interface';

export default interface IHouseRulesState {
  headline?: string;
  houseRules?: IHouseRule[];
  language?: string;
  error?: string;
  isLoading: boolean;
}
