import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InvitationCode } from 'src/dtos/invitation-code.interface';
import { CreateDto } from './create.dto';
import { InvitationCodeService } from './invitation-code.service';

@Controller('invitation-code')
export class InvitationCodeController {

  constructor(private readonly invitationCodeService: InvitationCodeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createAsync(@Body() createDto: CreateDto) : Promise<InvitationCode> {
    return this.invitationCodeService.createAsync(createDto);
  }
}
