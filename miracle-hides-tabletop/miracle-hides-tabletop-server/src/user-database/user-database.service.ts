import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
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

  async findOneAsync(predicate: (user: User) => Promise<boolean>): Promise<User> {    
    try {
      for await (const doc of this.userModel.find().cursor()) {
        if (await predicate(doc)) {
          return doc;
        }
      }
    } catch (err){
      return undefined;
    }
  }

}
