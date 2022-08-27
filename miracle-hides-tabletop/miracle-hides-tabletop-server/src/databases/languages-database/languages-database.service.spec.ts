import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesDatabaseService } from './languages-database.service';

describe('LanguagesDatabaseService', () => {
  let service: LanguagesDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguagesDatabaseService],
    }).compile();

    service = module.get<LanguagesDatabaseService>(LanguagesDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
