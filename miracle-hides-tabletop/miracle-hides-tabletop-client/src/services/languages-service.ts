import ILanguage from '../types/language.interface';
import { Method } from '../types/method.type';
import cachedFetchService from './cached-fetch-service';
import FetchError from './fetch-error';
import { SERVICE_NOT_AVAIABLE } from './responses';

export default async function languagesService(): Promise<ILanguage[]> {
  try {
    const response = await cachedFetchService({
      method: 'GET' as Method,
      url: `/api/languages`,
    });

    if (!response.json) {
      throw new FetchError({ message: SERVICE_NOT_AVAIABLE });
    }

    return response.json as ILanguage[];
  } catch (err) {
    console.error(err);
    throw new FetchError({ message: SERVICE_NOT_AVAIABLE });
  }
}
