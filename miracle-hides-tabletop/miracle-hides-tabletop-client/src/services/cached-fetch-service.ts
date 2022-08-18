import IFetchResult from "../types/fetch-result.interface";
import { Method } from "../types/method.type";
import fetchService from './fetch-service';

const cache : { [key: string]: any } = {
};

function isString(data: any): data is string {
  return typeof data === 'string';
};

const stringifyBody = (body?: { [key: string]: any }) : string => {
  if (!body) {
    return '';
  }

  const keys = Object.keys(body);
  keys.sort();
  const result = keys.map((key) => {
    const value = body[key];
    if (isString(value)) {
      return `"${key}":"${value}"`;
    }

    throw new Error('unsupported value: ', value);
  });

  return `{${result.join(',')}}`
}

const createKey = (url: string, method: string, body?: object) => {
  return `${url}#${method}#${stringifyBody(body)}`;
}

export default async function cachedFetchService({
  url,
  method,
  body,
} : {
  url: string,
  method: Method,
  body?: object,    
}) : Promise<IFetchResult> {
  const key = createKey(url, method, body);
  if (key in cache) {
    return cache[key];
  }

  const result = await fetchService({ url, method, body});
  cache[key] = result;
  return result;
}
