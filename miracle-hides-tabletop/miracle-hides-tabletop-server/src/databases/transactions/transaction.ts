import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';
import { ITransaction } from 'src/types/transaction.types';

export class Transaction implements ITransaction {
  private session: ClientSession;

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async abortTransactionAsync(): Promise<void> {
    await this.session.abortTransaction();
  }

  async commitTransactionAsync() : Promise<void> {
    const doc = await this.session.commitTransaction();
    await this.session.endSession();
  }

  async startTransactionAsync(): Promise<void> {
    this.session = await this.connection.startSession();
    await this.session.startTransaction();
  }

  async useTransactionAsync<T>(func: (session: ClientSession) => Promise<T>): Promise<T> {
    return func(this.session);
  }
}
