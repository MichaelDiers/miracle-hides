import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as userInvitationTypes from '../../types/user-invitations.types';

@Injectable()
export class UserInvitationsService implements userInvitationTypes.IUserInvitationService {
  constructor(
    @Inject(userInvitationTypes.USER_INVITATION_DATABASE_SERVICE)
    private readonly databaseService: userInvitationTypes.IUserInvitationDatabaseService,
  ) {}

  async createAsync(
    userInvitationCreate: userInvitationTypes.IUserInvitationCreate,
    userCreate: string,
  ): Promise<userInvitationTypes.IUserInvitation> {
    const userInvitation: userInvitationTypes.IUserInvitation = {
      displayName: userInvitationCreate.displayName,
      invitationCode: uuidv4(),
      guid: uuidv4(),
      isActive: true,
    };

    const result = await this.databaseService.createAsync(userInvitation, userCreate);
    if (!result) {
      throw new ConflictException();
    }

    return {
      displayName: result.displayName,
      guid: result.guid,
      invitationCode: result.invitationCode,
      isActive: result.isActive,
    };
  }

  async deleteAsync(guid: string): Promise<void> {
    const result = await this.databaseService.deleteAsync(guid);
    if (!result) {
      throw new NotFoundException();
    }
  }

  async readAsync(guid: string): Promise<userInvitationTypes.IUserInvitation> {
    const result = await this.databaseService.readAsync(guid);
    if (!result) {
      throw new NotFoundException();
    }

    return {
      displayName: result.displayName,
      guid: result.guid,
      invitationCode: result.invitationCode,
      isActive: result.isActive,
    };
  }

  async readAllAsync(): Promise<userInvitationTypes.IUserInvitation[]> {
    const result = await this.databaseService.readAllAsync();
    if (!result && result.length === 0) {
      return result;
    }


    return result.map(({ 
        displayName,
        guid,
        invitationCode,
        isActive,
      }) => ({
        displayName,
        guid,
        invitationCode,
        isActive,
      }));
  }

  async readByInvitationCodeAsync(code: string): Promise<userInvitationTypes.IUserInvitation> {
    const result = await this.databaseService.readByInvitationCodeAsync(code);
    if (!result) {
      throw new NotFoundException();
    }

    return {
      displayName: result.displayName,
      guid: result.guid,
      invitationCode: result.invitationCode,
      isActive: result.isActive,
    };
  }

  async updateAsync(
    update: userInvitationTypes.IUserInvitationUpdate,
    userUpdate: string,
  ): Promise<void> {
    const result = await this.databaseService.updateAsync(update, userUpdate);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
