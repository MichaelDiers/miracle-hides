import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ITransaction } from 'src/types/transaction.types';
import { Transaction } from './transaction';

@Injectable()
export class TransactionFactory {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createAsync(): Promise<ITransaction> {
    const transaction = new Transaction(this.connection);
    await transaction.startTransactionAsync();
    return transaction;
  }
}
