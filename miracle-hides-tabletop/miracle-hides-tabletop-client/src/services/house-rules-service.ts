import IFetchResult from '../types/fetch-result.interface';
import IHouseRule from '../types/house-rule.interface';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import { Language, normalizeLanguage } from '../types/language.type';
import { Method } from '../types/method.type';
import cachedFetchService from './cached-fetch-service';

export default function houseRulesService(language: Language): Promise<IHouseRulesServiceResult> {
  return new Promise((resolve, reject) => {    
    cachedFetchService({
      method: 'GET' as Method,
      url: `/house-rules/${language}`,
    }).then((fetchResult: IFetchResult) => {
      if (!fetchResult.json) {
        resolve({ error: 'nothing found' });
        console.error(fetchResult);
      }

      const result = fetchResult.json as { headline: string, houseRules: IHouseRule[], language: string };      

      resolve({
        headline: result.headline,
        houseRules: result.houseRules,
        language: normalizeLanguage(result.language),
      });
    }).catch((fetchResult: IFetchResult) => {
      console.error(fetchResult);
      reject({ error: 'nothing found' });
    });
  });
}