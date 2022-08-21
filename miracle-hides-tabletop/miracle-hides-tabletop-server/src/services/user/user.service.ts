import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import signUpDataInterface from 'src/types/sign-up-data.interface';
import ITokenResponse from 'src/types/token-response.interface';
import { IUserDatabaseService, USER_DATABASE_SERVICE } from 'src/types/user-database-service.interface';
import { IUserService } from 'src/types/user-service.interface';
import { HASH_SERVICE, IHashService } from 'src/types/hash-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(USER_DATABASE_SERVICE) private readonly databaseService: IUserDatabaseService,
  ) {}

  async createAsync(signUpData: signUpDataInterface): Promise<ITokenResponse> {
    const databaseUser = await this.databaseService.findOneAsync(
      async (user) => await this.hashService.compareAsync(signUpData.email, user.email) 
        || signUpData.displayName.toUpperCase() === user.displayName.toUpperCase(),
    );

    if (databaseUser) {
      return;
    }

    const user = await this.databaseService.createAsync({
      ...signUpData,
      email: await this.hashService.hashAsync(signUpData.email),
      guid: uuidv4(),
      password: await this.hashService.hashAsync(signUpData.password),
    });

    if (!user) {
      return;
    }

    return {
      displayName: user.displayName,
      token: 'TOKEN',
    };
  }
}
