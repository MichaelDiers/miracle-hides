import IHouseRule from '../types/house-rule.interface';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import { Method } from '../types/method.type';
import cachedFetchService from './cached-fetch-service';
import FetchError from './fetch-error';
import { SERVICE_NOT_AVAIABLE } from './responses';

const URL = process.env.REACT_APP_MH_HOUSE_RULES_URL;

export default async function houseRulesService(language: string): Promise<IHouseRulesServiceResult> {  
  try {
    const response = await cachedFetchService({
      method: 'GET' as Method,
      url: `${URL}/${language}`,
    });
    
    if (!response.json) {
      throw new FetchError({ message: SERVICE_NOT_AVAIABLE });
    }

    const result = response.json as { headline: string, houseRules: IHouseRule[], language: string };      

    return {
      headline: result.headline,
      houseRules: result.houseRules,
      language: result.language,
    };
  } catch (err) {
    console.error(err);
    throw new FetchError({ message: SERVICE_NOT_AVAIABLE });
  }
}