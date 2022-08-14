import { Test, TestingModule } from '@nestjs/testing';
import { HouseRulesController } from './house-rules.controller';

describe('HouseRulesController', () => {
  let controller: HouseRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseRulesController],
    }).compile();

    controller = module.get<HouseRulesController>(HouseRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
