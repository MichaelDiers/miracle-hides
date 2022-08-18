import IFetchResult from '../types/fetch-result.interface';
import ILanguageResult from '../types/language-result.interface';
import ILanguage from '../types/language.interface';
import { Method } from '../types/method.type';
import { SERVICE_NOT_AVAIABLE } from '../types/service-result.interface';
import cachedFetchService from './cached-fetch-service';

export default function languagesService(): Promise<ILanguageResult> {
  return new Promise((resolve, reject) => {    
    cachedFetchService({
      method: 'GET' as Method,
      url: `/api/languages`,
    }).then((fetchResult: IFetchResult) => {
      if (!fetchResult.json) {
        resolve(SERVICE_NOT_AVAIABLE);
        console.error(fetchResult);
      }

      resolve({ languages: fetchResult.json as ILanguage[] });
    }).catch((fetchResult: IFetchResult) => {
      console.error(fetchResult);
      reject(SERVICE_NOT_AVAIABLE);
    });
  });
}
