import { ListHouseRulesRequestDto } from './list-house-rules-request.dto';
import IListHouseRulesResult from './list-house-rules-result.interface';

export interface IHouseRulesService {
  listAsync(request: ListHouseRulesRequestDto) : Promise<IListHouseRulesResult>;
}

export const HOUSE_RULES_SERVICE = 'HOUSE_RULES_SERVICE';
