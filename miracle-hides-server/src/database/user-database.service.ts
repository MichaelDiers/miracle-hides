import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { HashService } from '../hash/hash.service';
import { FirebaseDatabaseService } from './firebase-database.service';
import { User } from './user';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../auth/create-user.dto';

@Injectable()
export class UserDatabaseService {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly firebaseDatabase: FirebaseDatabaseService,
    private readonly hashService: HashService,
  ) {}

  async createUserAsync(createUserDto: CreateUserDto): Promise<boolean> {
    const user = new User(
      uuidv4(),
      await this.hashService.hash(createUserDto.email),
      await this.hashService.hash(createUserDto.password),
    );

    return this.firebaseDatabase.insertAsync(
      this.configurationService.read().userCollectionName,
      user.userId,
      user,
    );
  }

  async readByEmailAsync(email: string): Promise<User | undefined> {
    const data = await this.firebaseDatabase.readOneByPredicateAsync(
      this.configurationService.read().userCollectionName,
      (user) =>
        this.hashService.compare(email, Object.assign(new User(), user).email),
    );

    if (!data) {
      return;
    }

    return Object.assign(new User(), data);
  }
}
