import { Test, TestingModule } from '@nestjs/testing';
import { InvitationCodesDatabaseService } from './invitation-codes-database.service';

describe('InvitationCodesDatabaseService', () => {
  let service: InvitationCodesDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationCodesDatabaseService],
    }).compile();

    service = module.get<InvitationCodesDatabaseService>(InvitationCodesDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
