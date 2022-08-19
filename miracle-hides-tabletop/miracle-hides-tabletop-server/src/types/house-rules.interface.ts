import IHouseRule from './house-rule.interface';

export default interface IHouseRules {
  language: string;
  houseRules: IHouseRule[];
}
