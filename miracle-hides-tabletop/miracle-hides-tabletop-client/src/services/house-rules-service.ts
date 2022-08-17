import IFetchResult from '../types/fetch-result.interface';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import { Language } from '../types/language.type';
import { Method } from '../types/method.type';
import fetchService from './fetch-service';

export default function houseRulesService(language: Language): Promise<IHouseRulesServiceResult> {
  return new Promise((resolve, reject) => {    
    fetchService({
      method: 'GET' as Method,
      url: `/house-rules/${language}`,
    }).then((fetchResult: IFetchResult) => {
      resolve(fetchResult.json as IHouseRulesServiceResult);
    }).catch((fetchResult: IFetchResult) => {
      console.error(fetchResult);
      reject({ error: 'nothing found' });
    });
  });
}