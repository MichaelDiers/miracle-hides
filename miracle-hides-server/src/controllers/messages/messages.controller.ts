import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { MessageDto } from 'src/dtos/message.dto';
import { JwtService } from 'src/services/jwt/jwt.service';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly messageService: MessagesService,
        private readonly jwtService: JwtService,
    ) {}

    @Post()
    async sendAsync(
        @Headers() headers,
        @Body() message: MessageDto,
    ) {
        const uid = await this.jwtService.verifyToken(headers.authorization.substring(7));
        if (uid) {
            return this.messageService.send(
                {
                    receiver: message.receiver,
                    sender: uid,
                    text: message.text,
                },
            );
        } else {
            throw new UnauthorizedException();
        }
    }
}
