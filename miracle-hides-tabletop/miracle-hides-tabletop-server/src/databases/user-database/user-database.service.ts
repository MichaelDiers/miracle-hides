import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { ILoggingService, LOGGING_SERVICE } from 'src/types/logging.types';
import { IEntryInfo } from '../../base-types/entry-info';
import { ITransaction } from '../../types/transaction.types';
import UserRoles from '../../types/user-roles';
import {
  IDatabaseUser,
  IUser,
  IUserDatabaseService,
  IUserUpdate,
  USER,
} from '../../types/user.types';

@Injectable()
export class UserDatabaseService implements IUserDatabaseService {
  constructor(
    @InjectModel(USER)
    private userModel: Model<IDatabaseUser>,
    @Inject(LOGGING_SERVICE) private readonly loggingService: ILoggingService,
  ) {}

  async createAsync(user: IUser, transaction?: ITransaction): Promise<IDatabaseUser> {
    const entryInfo: IEntryInfo = {
      created: new Date().toISOString(),
      createdUser: user.guid,
      updated: '',
      updateUser: '',
    };

    const databaseUser: IDatabaseUser = {
      ...user,
      ...entryInfo,
    };

    try {
      let documents;
      if (transaction) {
        documents = await transaction.useTransactionAsync(
          (session: ClientSession) => this.userModel.create(
            [databaseUser],
            { session },
          ),
        );
      } else {
        documents = [await this.userModel.create(databaseUser)];
      }
      
      return documents[0];
    } catch (err){
      this.loggingService.error(err.message, err.stack);
      return undefined;
    }
  }

  async deleteAsync(guid: string): Promise<boolean> {
    try {
      const result = await this.userModel.deleteOne({ guid });
      return result.acknowledged && result.deletedCount === 1;
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return false;
    }
  }

  async findOneAsync(predicate: ((user: IDatabaseUser) => Promise<boolean>)|string): Promise<IDatabaseUser> {
    if (typeof predicate === 'function') {
      try {
        for await (const doc of this.userModel.find().cursor()) {
          if (await predicate(doc)) {
            return doc;
          }
        }
      } catch (err){
        this.loggingService.error(err.message, err.stack);
        return;
      }
    }
    else {
      try {
        const doc = await this.userModel.findOne({ guid: predicate }).exec();
        return doc;
      } catch (err) {
        this.loggingService.error(err.message, err.stack);
        return;
      }
    }
  }

  async readAllAsync(): Promise<IDatabaseUser[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (err) {
      this.loggingService.error(err.message, err.stack);
      return [];
    }
  }

  async updateAsync(userUpdate: IUserUpdate, updateUser: string): Promise<boolean> {
    return this.updateUserAsync({
      ...userUpdate,
      updateUser,
    });
  }

  private async updateUserAsync(
    {
      displayName,
      guid,
      isDeleted,
      isEmailVerified,
      roles,
      transaction,
      updateUser,
    }: {
      displayName?: string,
      guid: string,
      isDeleted?: boolean,
      isEmailVerified?: boolean,
      roles?: UserRoles[],
      transaction?: ITransaction,
      updateUser: string,
    }): Promise<boolean> {
      const update: any = {
        updateUser,
        updated: new Date().toISOString(),
      };

      if (displayName) {
        update.displayName = displayName;
      }

      if (isDeleted || isDeleted === false) {
        update.isDeleted = isDeleted;
      }

      if (isEmailVerified || isEmailVerified === false) {
        update.isEmailVerified = isEmailVerified;
      }

      if (roles) {
        update.roles = roles;
      }

      let result;
      try {
        if (transaction) {
          result = await transaction.useTransactionAsync(
            async (session: ClientSession) => {
              const updateResult = await this.userModel.updateOne(
                { guid },
                update,
                { session },
              );

              return updateResult;
            }
          )
        } else {
          result = await this.userModel.updateOne({ guid }, update);
        }
      } catch (err) {
        this.loggingService.error(err.message, err.stack);
        return false;
      }

      return result.acknowledged && result.matchedCount === 1;
    }
}
