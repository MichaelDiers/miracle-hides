import { firestore } from "firebase-admin";

export interface MessageEntity {
    receiver: string;
    sender: string;
    text: string;
    timestamp: firestore.Timestamp;
}
