import { Test, TestingModule } from '@nestjs/testing';
import { HouseRulesServiceService } from './house-rules-service.service';

describe('HouseRulesServiceService', () => {
  let service: HouseRulesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseRulesServiceService],
    }).compile();

    service = module.get<HouseRulesServiceService>(HouseRulesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
