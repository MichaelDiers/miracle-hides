import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Payload } from './payload';
import { FirebaseAuthService } from './firebase-auth.service';
import { UserDto } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly datbaseService: DatabaseService,
  ) {}

  alive(): string {
    return 'service is alive';
  }

  async authenticateAsync(userDto: UserDto): Promise<string | undefined> {
    const user = await this.datbaseService.readUserAsync(userDto.email);

    if (!user) {
      return;
    }

    const payload = new Payload(user.userId);
    return this.firebaseAuthService.tokenAsync(user.userId, payload);
  }
}
