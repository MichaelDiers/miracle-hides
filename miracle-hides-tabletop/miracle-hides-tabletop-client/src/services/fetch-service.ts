import { actions } from '../app/active-processes-slice';
import { store } from '../app/store';
import IFetchResult from "../types/fetch-result.interface";
import { Method } from "../types/method.type";
import FetchError from './fetch-error';

export default function fetchService({
  url,
  method,
  body,
} : {
  url: string,
  method: Method,
  body?: object,    
}) : Promise<IFetchResult> {
  const serverPrefix = process.env.REACT_APP_MH_SERVER_PREFIX || '';  
  return new Promise((resolve, reject) => {
    store.dispatch(actions.increment());
    fetch(
      `${serverPrefix}${url}`,
      {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: [['Content-Type', 'application/json']],
      },
    ).then((response) => {
      const status = response.status;
      if (response.ok) {
        response.text()
          .then((text) => resolve({ status, json: JSON.parse(text) }))
          .catch((err) => {
            reject(new FetchError({ message: err.message, status }));
          });
      } else {
        reject(new FetchError({ status }));
      }
    }).catch((err) => {
      reject(new FetchError({ message: err.message }));
    }).finally(() => {
      store.dispatch(actions.decrement());
    });
  });
}
