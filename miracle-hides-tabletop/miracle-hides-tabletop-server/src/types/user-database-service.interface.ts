import { ClientSession } from 'mongoose';
import { User } from 'src/user-database/user.schema';

export interface IUserDatabaseService {
  createAsync(user: User, session?: ClientSession): Promise<User>;

  findOneAsync(predicate: ((user: User) => Promise<boolean>)|string): Promise<User>;

  readAllAsync(): Promise<User[]>;
}

export const USER_DATABASE_SERVICE = 'USER_DATABASE_SERVICE';
