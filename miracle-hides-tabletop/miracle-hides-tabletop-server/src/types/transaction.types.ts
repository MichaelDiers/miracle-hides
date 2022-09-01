import { ClientSession } from 'mongoose';

export const TRANSACTION_FACTORY = 'TRANSACTION_FACTORY';

export interface ITransaction {
  abortTransactionAsync(): Promise<void>;

  commitTransactionAsync() : Promise<void>;

  useTransactionAsync<T>(func: (session: ClientSession) => Promise<T>): Promise<T>;
}

export interface ITransactionFactory {
  createAsync(): Promise<ITransaction>;
}
