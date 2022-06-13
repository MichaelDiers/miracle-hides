import { Injectable } from '@nestjs/common';
import { Message } from 'src/dtos/message.interface';

@Injectable()
export class MessagesService {
    public send(message: Message) {
        console.log(message);
    }
}
