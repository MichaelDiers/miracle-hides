import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { FirebaseDatabaseService } from './firebase-database.service';
import { User } from './user';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly firebaseDatabaseService: FirebaseDatabaseService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async readUserAsync(email: string): Promise<User | undefined> {
    const result = await this.firebaseDatabaseService.readOneAsync(
      this.configurationService.read().userCollectionName,
      email,
    );

    if (!result) {
      return;
    }

    return Object.assign(new User(), result);
  }
}
