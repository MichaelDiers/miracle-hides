import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class JwtService {
    constructor(private readonly firebaseService: FirebaseService) {}

    public async createTokenAsync(uid: string): Promise<string> {
        return this.firebaseService.auth().createCustomToken(uid);
    }

    public async verifyToken(token: string) : Promise<string> {
        try {
            const payload = await this.firebaseService.auth().verifyIdToken(token, true);
            if (payload) {
                return payload.uid;
            }

            return;
        } catch
        {
            return;
        }
    }
}
