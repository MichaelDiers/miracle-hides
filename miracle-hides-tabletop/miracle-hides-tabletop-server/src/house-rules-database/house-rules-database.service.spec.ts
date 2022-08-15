import { Test, TestingModule } from '@nestjs/testing';
import { HouseRulesDatabaseService } from './house-rules-database.service';

describe('HouseRulesDatabaseService', () => {
  let service: HouseRulesDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseRulesDatabaseService],
    }).compile();

    service = module.get<HouseRulesDatabaseService>(HouseRulesDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
