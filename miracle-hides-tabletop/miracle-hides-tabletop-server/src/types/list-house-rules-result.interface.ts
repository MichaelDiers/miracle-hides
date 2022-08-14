import IHouseRule from './house-rule.interface';

export default interface IListHouseRulesResult {
  headline: string;
  houseRules: IHouseRule[];
}
