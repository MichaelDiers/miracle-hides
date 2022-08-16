import IHouseRule from 'src/types/house-rule.interface';

export default class HouseRuleDto implements IHouseRule {
  topic: string;

  descriptions: string[];
}
