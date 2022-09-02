import { Module } from '@nestjs/common';
import { TRANSACTION_FACTORY } from '../../types/transaction.types';
import { TransactionFactory } from './transaction-factory';

@Module({
  exports: [TRANSACTION_FACTORY],
  providers: [
    {
      provide: TRANSACTION_FACTORY,
      useClass: TransactionFactory,
    },
    TransactionFactory,
  ],
})
export class TransactionsModule {}
