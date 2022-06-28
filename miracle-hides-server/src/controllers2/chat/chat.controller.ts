import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateDto } from './create.dto';

@Controller('chat')
export class ChatController {
  @Post()
  @HttpCode(HttpStatus.OK)
  public async createAsync(createDto: CreateDto) : Promise<void> {
    
  }
}
