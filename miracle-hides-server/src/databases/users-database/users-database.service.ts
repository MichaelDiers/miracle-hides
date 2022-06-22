import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from 'src/services/config/config.service';
import { User } from '../../dtos/user.interface';
import { UserEntity } from './user-entity.schema';

@Injectable()
export class UsersDatabaseService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  public async createAsync(user: User): Promise<void> {
    await new this.userModel(user).save();
  }

  public async findUserAsync(predicate: (user: User) => Promise<boolean>) : Promise<User | undefined> {
    const iterator = this.readAllAsync();
    let current = iterator.next();
    while (!(await current).done) {
      const users = (await current).value;
      if (users) {
        const results = await Promise.all(users.map(predicate));
        const index = results.findIndex(result => result);
        if (index > -1) {
          return users[index];
        }
      }
      
      current = iterator.next();
    }
  }

  public async *readAllAsync() {
    const { pagingSize } = await this.configService.readAsync();
    let found = true;
    for (let start = 0; found; start += pagingSize) {
      const current = await this.userModel.find().sort({ '_id': -1 }).skip(start).limit(pagingSize).exec();
      if (current && current.length > 0) {
        yield current;
      } else {
        found = false;
      }
    }
  }

  public async setEmailIsVerfiedAsync(user: User) : Promise<boolean> {
    const result = await this.userModel.findOneAndUpdate(
      { userId: user.userId },
      { isEmailVerified: true },
      { new: true });
    return result && result.isEmailVerified;
  }
}
