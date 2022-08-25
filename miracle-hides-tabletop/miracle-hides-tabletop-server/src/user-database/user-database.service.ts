import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import UpdateUserDto from 'src/controllers/updateUser.dto';
import { IUserDatabaseService } from 'src/types/user-database-service.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserDatabaseService implements IUserDatabaseService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createAsync(user: User, session?: ClientSession): Promise<User> {
    try {
      const documents = await this.userModel.create([user], {session});
      return documents[0];
    } catch (err){
      return undefined;
    }
  }

  async deleteAsync(guid: string): Promise<boolean> {
    try {
      const result = await this.userModel.deleteOne({ guid }).exec();
      return result.acknowledged && result.deletedCount === 1;
    } catch (err) {
      return false;
    }
  }

  async findOneAsync(predicate: ((user: User) => Promise<boolean>)|string): Promise<User> {
    if (typeof predicate === 'function') {
      try {
        for await (const doc of this.userModel.find().cursor()) {
          if (await predicate(doc)) {
            return doc;
          }
        }
      } catch (err){
        return;
      }
    }
    else {
      try {
        const doc = await this.userModel.findOne({ guid: predicate }).exec();
        return doc;
      } catch (err) {
        return;
      }
    }
  }

  async readAllAsync(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (err) {
      return [];
    }
  }

  async updateAsync(user: UpdateUserDto): Promise<boolean> {
    try {
      const result = await this.userModel.updateOne({ guid: user.guid }, user);
      return result.acknowledged && result.matchedCount === 1;
    } catch (err) {
      return false;
    }
  }
}
