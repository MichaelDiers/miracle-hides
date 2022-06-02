import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FirebaseDatabaseService {
  constructor(private readonly firbaseService: FirebaseService) {}

  async readOneAsync(
    collection: string,
    userId: string,
  ): Promise<object | undefined> {
    const result = {
      email: 'foo@bar.de',
      password: 'password',
      userId,
    };

    return result;
  }
}
