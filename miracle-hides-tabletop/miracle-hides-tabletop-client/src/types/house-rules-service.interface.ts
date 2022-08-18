import IHouseRulesServiceResult from './house-rules-service-result.interface';

export default interface IHouseRulesService {
  (language: string): Promise<IHouseRulesServiceResult>;
}
