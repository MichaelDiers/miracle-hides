import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    private readonly app: admin.app.App;

    constructor() {
        this.app = admin.initializeApp();
    }

    auth(): admin.auth.Auth {
        return this.app.auth();
    }

    firestore(): admin.firestore.Firestore {
        return this.app.firestore();
    }
}
