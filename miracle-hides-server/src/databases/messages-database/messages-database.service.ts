import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { ConfigService } from 'src/services/config/config.service';
import { FirebaseService } from 'src/services/firebase/firebase.service';
import { Message } from '../../dtos/message.interface';
import { MessageEntity } from './message-entity.interface';

@Injectable()
export class MessagesDatabaseService {
    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly configService: ConfigService,
    ) {}

    public async createAsync(message: Message): Promise<Message> {
        const data : MessageEntity = {
            receiver: message.receiver,
            sender: message.sender,
            text: message.text,
            timestamp: firestore.FieldValue.serverTimestamp() as firestore.Timestamp,
        };

        const document = this.firebaseService
            .firestore()
            .collection((await this.configService.readAsync()).messagesCollectionName)
            .doc();
        await document.set(data);
        return message;
      }
}
