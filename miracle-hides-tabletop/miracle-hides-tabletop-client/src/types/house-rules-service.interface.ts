import IHouseRulesServiceResult from './house-rules-service-result.interface';
import { Language } from './language.type';

export default interface IHouseRulesService {
  (language: Language): Promise<IHouseRulesServiceResult>;
}
