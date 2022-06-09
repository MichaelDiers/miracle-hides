import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class JwtService {
    constructor(private readonly firebaseService: FirebaseService) {}

    public async createTokenAsync(uid: string): Promise<string> {
        return this.firebaseService.auth().createCustomToken(uid);
    }
}
