import { Test, TestingModule } from '@nestjs/testing';
import { MessagesDatabaseService } from './messages-database.service';

describe('MessagesDatabaseService', () => {
  let service: MessagesDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesDatabaseService],
    }).compile();

    service = module.get<MessagesDatabaseService>(MessagesDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
