import { Injectable } from '@nestjs/common';
import { Payload } from './payload';
import { FirebaseAuthService } from './firebase-auth.service';
import { UserDto } from './user.dto';
import { CreateUserDto } from './create-user.dto';
import { UserDatabaseService } from '../database/user-database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly userDatbaseService: UserDatabaseService,
  ) {}

  async authenticateAsync(userDto: UserDto): Promise<string | undefined> {
    const user = await this.userDatbaseService.readByEmailAsync(userDto.email);

    if (!user) {
      return;
    }

    const payload = new Payload(user.userId);
    return this.firebaseAuthService.tokenAsync(user.userId, payload);
  }

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const userExists = await this.userDatbaseService.readByEmailAsync(
      createUserDto.email,
    );

    if (userExists) {
      return false;
    }

    return this.userDatbaseService.createUserAsync(createUserDto);
  }
}
