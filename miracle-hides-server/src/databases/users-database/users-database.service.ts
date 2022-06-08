import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../dtos/user.interface';
import { UserEntity } from './user-entity.schema';

@Injectable()
export class UsersDatabaseService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  public async createAsync(user: User): Promise<User> {
    return new this.userModel(user).save();
  }

  public async readAllAsync(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
