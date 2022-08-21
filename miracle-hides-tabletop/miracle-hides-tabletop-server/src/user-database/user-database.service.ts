import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserDatabaseService } from 'src/types/user-database-service.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserDatabaseService implements IUserDatabaseService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createAsync(user: User): Promise<User> {
    try {
      const document = await this.userModel.create(user);
      return document;
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
