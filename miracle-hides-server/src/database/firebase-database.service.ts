import { Injectable } from '@nestjs/common';
import { LogEntry } from '../logging/log-entry';
import { LoggingService } from '../logging/logging.service';
import { FirebaseService } from '../firebase/firebase.service';
import { FieldPath } from 'firebase-admin/firestore';
@Injectable()
export class FirebaseDatabaseService {
  constructor(
    private readonly firbaseService: FirebaseService,
    private readonly loggingService: LoggingService,
  ) {}

  async insertAsync(
    collection: string,
    documentId: string,
    document: object,
  ): Promise<boolean> {
    try {
      const data = {};
      for (const [key, value] of Object.entries(document)) {
        data[key] = value;
      }

      const doc = this.firbaseService
        .firestore()
        .collection(collection)
        .doc(documentId);
      await doc.create(data);
      return true;
    } catch (error) {
      this.loggingService.error(new LogEntry(error.message, error.stack));
      return false;
    }
  }

  async readByDocumentIdAsync(
    collection: string,
    documentId: string,
  ): Promise<object | undefined> {
    const snapshot = await this.firbaseService
      .firestore()
      .collection(collection)
      .doc(documentId)
      .get();
    if (!snapshot || !snapshot.exists) {
      return;
    }

    return snapshot.data();
  }

  async readOneByPredicateAsync(
    collection: string,
    predicate: (data: object) => Promise<boolean>,
  ): Promise<object | undefined> {
    let snapshot = await this.firbaseService
      .firestore()
      .collection(collection)
      .orderBy(FieldPath.documentId())
      .limit(100)
      .get();

    let lastDoc = null;
    while (snapshot && snapshot.size > 0) {
      for (const doc of snapshot.docs) {
        lastDoc = doc;
        const data = doc.data();
        if (await predicate(data)) {
          return data;
        }
      }

      snapshot = await this.firbaseService
        .firestore()
        .collection(collection)
        .orderBy(FieldPath.documentId())
        .startAfter(lastDoc)
        .limit(100)
        .get();
    }

    return;
  }
}
