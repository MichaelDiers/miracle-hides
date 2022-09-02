import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILoggingService, LOGGING_SERVICE } from '../../types/logging.types';
import * as userInvitationTypes from '../../types/user-invitations.types';

@Injectable()
export class UserInvitationsDatabaseService implements userInvitationTypes.IUserInvitationDatabaseService {
  constructor(
    @InjectModel(userInvitationTypes.USER_INVITATION)
    private userInvitationModel: Model<userInvitationTypes.IUserInvitationDatabase>,
    @Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService,
  ) {}

  async createAsync(
    userInvitation: userInvitationTypes.IUserInvitation,
    userCreated: string,
  ): Promise<userInvitationTypes.IUserInvitationDatabase> {
    try {
      const {
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      } = await this.userInvitationModel.create({
        ...userInvitation,
        created: new Date().toISOString(),
        createdUser: userCreated,
      });

      return {
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      };
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return;
    }
  }

  async deleteAsync(guid: string): Promise<boolean> {
    try {
      const result = await this.userInvitationModel.deleteOne({ guid });
      return result.acknowledged && result.deletedCount === 1;
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return false;
    }
  }

  async readAsync(entryGuid: string): Promise<userInvitationTypes.IUserInvitationDatabase> {
    try {
      const {
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      } = await this.userInvitationModel.findOne({ guid: entryGuid }).exec();
      return {
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      };
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return;
    }
  }

  async readByInvitationCodeAsync(entryInvitationCode: string)
  : Promise<userInvitationTypes.IUserInvitationDatabase> {
    try {
      const {
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      } = await this.userInvitationModel.findOne(
        { invitationCode: entryInvitationCode.toLowerCase() },
      ).exec();
      return {
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      };
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return;
    }
  }

  async readAllAsync(): Promise<userInvitationTypes.IUserInvitationDatabase[]> {
    try {
      const documents = await this.userInvitationModel.find().exec();
      return documents.map(({
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      }) => ({
        displayName,
        guid,
        invitationCode,
        isActive,
        created,
        createdUser,
        updated,
        updateUser,
      }));
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return;
    }
  }

  async updateAsync(
    update: userInvitationTypes.IUserInvitationUpdate,
    userUpdate: string,
  ): Promise<boolean> {
    try {
      const updateResult = await this.userInvitationModel.updateOne(
        { guid: update.guid },
        {
          isActive: update.isActive,
          update: new Date().toISOString(),
          updateUser: userUpdate,          
        });
      return updateResult.acknowledged && updateResult.matchedCount === 1;
    } catch (err) {
      this.loggingService.error(err.message, err.stack); 
      return false;
    }
  }
}
