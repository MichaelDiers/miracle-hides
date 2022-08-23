import { Test, TestingModule } from '@nestjs/testing';
import { UserInvitationsController } from './user-invitations.controller';

describe('UserInvitationsController', () => {
  let controller: UserInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInvitationsController],
    }).compile();

    controller = module.get<UserInvitationsController>(UserInvitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
