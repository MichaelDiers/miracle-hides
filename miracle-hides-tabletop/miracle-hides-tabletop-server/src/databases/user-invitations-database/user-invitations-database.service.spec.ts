import { Test, TestingModule } from '@nestjs/testing';
import { UserInvitationsDatabaseService } from './user-invitations-database.service';

describe('UserInvitationsDatabaseService', () => {
  let service: UserInvitationsDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInvitationsDatabaseService],
    }).compile();

    service = module.get<UserInvitationsDatabaseService>(UserInvitationsDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
