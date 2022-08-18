import IHouseRule from './house-rule.interface';

export default interface IHouseRules {
  headline: string;
  language: string;
  houseRules: IHouseRule[];
}
