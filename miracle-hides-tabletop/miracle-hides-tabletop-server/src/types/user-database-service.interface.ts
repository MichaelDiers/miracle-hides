import { ClientSession } from 'mongoose';
import UpdateUserDto from 'src/controllers/updateUser.dto';
import { User } from 'src/user-database/user.schema';

export interface IUserDatabaseService {
  createAsync(user: User, session?: ClientSession): Promise<User>;

  deleteAsync(guid: string): Promise<boolean>;

  findOneAsync(predicate: ((user: User) => Promise<boolean>)|string): Promise<User>;

  readAllAsync(): Promise<User[]>;

  updateAsync(user: UpdateUserDto): Promise<boolean>;
}

export const USER_DATABASE_SERVICE = 'USER_DATABASE_SERVICE';
