import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsDatabaseService } from './translations-database.service';

describe('TranslationsDatabaseService', () => {
  let service: TranslationsDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationsDatabaseService],
    }).compile();

    service = module.get<TranslationsDatabaseService>(
      TranslationsDatabaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
