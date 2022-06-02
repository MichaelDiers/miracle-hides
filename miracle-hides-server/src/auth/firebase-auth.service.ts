import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FirebaseAuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async tokenAsync(userId: string, payload?: object): Promise<string> {
    return this.firebaseService.auth().createCustomToken(userId, payload);
  }
}
