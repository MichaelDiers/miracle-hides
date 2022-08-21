import { User } from 'src/user-database/user.schema';
import ISignUpData from './sign-up-data.interface';

export interface IUserDatabaseService {
  createAsync(user: User): Promise<User>;

  findOneAsync(predicate: (user: User) => Promise<boolean>): Promise<User>;
}

export const USER_DATABASE_SERVICE = 'USER_DATABASE_SERVICE';
