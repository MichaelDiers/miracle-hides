import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersDatabaseService } from '../../databases/users-database/users-database.service';
import { AuthenticateUserDto } from '../../dtos/authenticate-user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../dtos/user.interface';
import { HashService } from '../../services/hash/hash.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private usersDatabaseService: UsersDatabaseService,
  ) {}

  public async createUser(user: CreateUserDto): Promise<void> {
    const userExists = await this.readUserByEmail(user.email);
    if (userExists) {
      throw new ConflictException();
    }

    const createdUser = await this.usersDatabaseService.createAsync({
      displayName: user.displayName,
      email: await this.hashService.hash(user.email),
      forcePasswordChange: true,
      isLocked: false,
      lockedReason: '',
      password: await this.hashService.hash(user.password),
      signInAttemptFailures: 0,
      userId: uuidv4(),
    });

    if (createdUser) {
      return;
    }

    throw new ConflictException();
  }

  public async authenticateUser(
    authenticateUser: AuthenticateUserDto,
  ): Promise<string> {
    const user = await this.readUserByEmail(authenticateUser.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return 'token';
  }

  private async readUserByEmail(email: string): Promise<User> {
    const users = await this.usersDatabaseService.readAllAsync();
    const results = await Promise.all(
      users.map((user) => this.hashService.compare(email, user.email)),
    );
    const index = results.findIndex((result) => result);
    if (index < 0) {
      return;
    }

    return users[index];
  }
}
