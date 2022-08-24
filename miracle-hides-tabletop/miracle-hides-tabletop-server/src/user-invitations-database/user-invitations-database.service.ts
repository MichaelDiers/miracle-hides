import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IUserInvitationDatabaseService from 'src/types/user-invitation-database-service.interface';
import IUserInvitation from 'src/types/user-invitation.interface';
import { UserInvitation, UserInvitationDocument } from './user-invitation.schema';

@Injectable()
export class UserInvitationsDatabaseService implements IUserInvitationDatabaseService {
  constructor(
    @InjectModel(UserInvitation.name)
    private userInvitationModel: Model<UserInvitationDocument>,
  ) {}

  async createAsync(userInvitation: UserInvitation): Promise<IUserInvitation> {
    try {
      const {
        code,
        created,
        creator,
        guid,
        isActive,
        name,
      } = await this.userInvitationModel.create(userInvitation);
      return {
        code,
        created,
        creator,
        guid,
        isActive,
        name,
      };
    } catch {
      return;
    }
  }

  async deleteAsync(guid: string): Promise<boolean> {
    try {
      const result = await this.userInvitationModel.deleteOne({ guid });
      return result.acknowledged && result.deletedCount === 1;
    } catch {
      return false;
    }
  }

  async readAsync(ivguid: string): Promise<IUserInvitation> {
    try {
      const {
        code,
        created,
        creator,
        guid,
        isActive,
        name,
      } = await this.userInvitationModel.findOne({ guid: ivguid }).exec();
      return {
        code,
        created,
        creator,
        guid,
        isActive,
        name,
      };
    } catch {
      return;
    }
  }

  async readAllAsync(): Promise<IUserInvitation[]> {
    try {
      const documents = await this.userInvitationModel.find().exec();
      return documents.map(({
        code,
        created,
        creator,
        guid,
        isActive,
        name,
      }) => ({
        code,
        created,
        creator,
        guid,
        isActive,
        name,
      }));
    } catch {
      return;
    }
  }

  async updateAsync({
    guid,
    isActive,
    creator,
  } : {
    guid: string,
    isActive: boolean,
    creator: string,
  }): Promise<boolean> {
    try {
      const updateResult = await this.userInvitationModel.updateOne({ guid }, { isActive, creator });
      return updateResult.acknowledged && updateResult.matchedCount === 1;
    } catch { 
      return false;
    }
  }
}
