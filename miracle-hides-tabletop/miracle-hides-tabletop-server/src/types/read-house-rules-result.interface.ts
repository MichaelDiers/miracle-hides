import IHouseRule from './house-rule.interface';

export default interface IReadHouseRulesResult {
  headline: string;
  houseRules: IHouseRule[];
}
