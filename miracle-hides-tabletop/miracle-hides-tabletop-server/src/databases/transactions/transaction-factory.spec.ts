import { Test, TestingModule } from '@nestjs/testing';
import { TransactionFactory } from './transaction-factory';

describe('TransactionFactory', () => {
  let provider: TransactionFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionFactory],
    }).compile();

    provider = module.get<TransactionFactory>(TransactionFactory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
