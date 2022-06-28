import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InvitationCode } from 'src/dtos/invitation-code.interface';
import { CreateDto } from './create.dto';
import { DeleteDto } from './delete.dto';
import { InvitationCodeService } from './invitation-code.service';

@Controller('invitation-code')
export class InvitationCodeController {

  constructor(private readonly invitationCodeService: InvitationCodeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createAsync(@Body() createDto: CreateDto) : Promise<InvitationCode> {
    return this.invitationCodeService.createAsync(createDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAsync(@Body() deleteDto: DeleteDto) : Promise<void> {
    return this.invitationCodeService.deleteAsync(deleteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async readAsync() : Promise<InvitationCode[]> {
    return this.invitationCodeService.readAsync();
  }
}
