import IFetchResult from '../types/fetch-result.interface';
import IHouseRule from '../types/house-rule.interface';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import { Method } from '../types/method.type';
import { SERVICE_NOT_AVAIABLE } from '../types/service-result.interface';
import cachedFetchService from './cached-fetch-service';

export default function houseRulesService(language: string): Promise<IHouseRulesServiceResult> {
  return new Promise((resolve, reject) => {    
    cachedFetchService({
      method: 'GET' as Method,
      url: `/api/house-rules/${language}`,
    }).then((fetchResult: IFetchResult) => {
      if (!fetchResult.json) {
        resolve(SERVICE_NOT_AVAIABLE);
        console.error(fetchResult);
      }

      const result = fetchResult.json as { headline: string, houseRules: IHouseRule[], language: string };      

      resolve({
        headline: result.headline,
        houseRules: result.houseRules,
        language: result.language,
      });
    }).catch((fetchResult: IFetchResult) => {
      console.error(fetchResult);
      reject(SERVICE_NOT_AVAIABLE);
    });
  });
}