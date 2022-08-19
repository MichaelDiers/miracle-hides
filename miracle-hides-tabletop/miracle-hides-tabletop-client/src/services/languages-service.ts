import ILanguage from '../types/language.interface';
import { Method } from '../types/method.type';
import cachedFetchService from './cached-fetch-service';
import FetchError from './fetch-error';
import { SERVICE_NOT_AVAIABLE } from './responses';

const URL = process.env.REACT_APP_MH_LANGUAGES_URL;

export default async function languagesService(): Promise<ILanguage[]> {
  try {
    const response = await cachedFetchService({
      method: 'GET' as Method,
      url: `${URL}`,
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
