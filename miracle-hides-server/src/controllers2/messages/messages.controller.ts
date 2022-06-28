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
        return this.messageService.sendAsync(
            message,
            headers.authorization?.substring(7)
        );
    }
}
