import { Test, TestingModule } from '@nestjs/testing';
import { TranslationDatabaseService } from './translation-database.service.gen';

describe('TranslationDatabaseService', () => {
  let service: TranslationDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationDatabaseService],
    }).compile();

    service = module.get<TranslationDatabaseService>(
      TranslationDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
