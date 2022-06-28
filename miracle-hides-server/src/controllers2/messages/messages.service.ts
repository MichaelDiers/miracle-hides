import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagesDatabaseService } from 'src/databases/messages-database/messages-database.service';
import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/dtos/message.interface';
import { JwtService } from 'src/services/jwt/jwt.service';

@Injectable()
export class MessagesService {
    constructor(
        private readonly messagesDatabaseService: MessagesDatabaseService,
        private readonly jwtService: JwtService,
    ) {}

    public async sendAsync(message: MessageDto, token: string) : Promise<Message> {
        const uid = await this.jwtService.verifyToken(token);
        if (uid) {
            return this.messagesDatabaseService.createAsync({
                receiver: message.receiver,
                sender: uid,
                text: message.text,
            });
        } else {
            throw new UnauthorizedException();
        }
    }
}
