import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import IUserInvitationDatabaseService, { USER_INVITATION_DATABASE_SERVICE } from 'src/types/user-invitation-database-service.interface';
import IUserInvitation from 'src/types/user-invitation.interface';
import IUserInvitationsService from 'src/types/user-invitations-service.interface';

@Injectable()
export class UserInvitationsService implements IUserInvitationsService {
  constructor(
    @Inject(USER_INVITATION_DATABASE_SERVICE) private readonly databaseService: IUserInvitationDatabaseService,
  ) {}

  async createAsync({
    creator,
    email,
    name,
  } : {
    creator: string,
    email?: string,
    name: string,
  }): Promise<IUserInvitation> {
    const userInvitation: IUserInvitation = {
      code: uuidv4(),
      created: (new Date()).toISOString(),
      creator,
      guid: uuidv4(),
      isActive: true,
      name, 
    };

    const result = await this.databaseService.createAsync(userInvitation);
    if (!result) {
      throw new ConflictException();
    }

    return result;
  }

  async deleteAsync(guid: string): Promise<void> {
    const result = await this.databaseService.deleteAsync(guid);
    if (!result) {
      throw new NotFoundException();
    }    
  }

  async readAsync(guid: string): Promise<IUserInvitation> {
    const result = await this.databaseService.readAsync(guid);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async readAllAsync(): Promise<IUserInvitation[]> {
    return this.databaseService.readAllAsync();
  }

  async readByCodeAsync(code: string): Promise<IUserInvitation> {
    const result = await this.databaseService.readByCodeAsync(code);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async updateAsync({
    guid,
    isActive,
    creator,
  } : {
    guid: string,
    isActive: boolean,
    creator: string,
  }): Promise<void> {
    const result = await this.databaseService.updateAsync({ guid, isActive, creator });
    if (!result) {
      throw new NotFoundException();
    }
  }
}
