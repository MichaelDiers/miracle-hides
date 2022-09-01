import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Payload } from 'src/decorators/payload.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { IJwtPayload } from '../types/user.types';
import { IUserInvitation, IUserInvitationService, UserInvitationCreateDto, UserInvitationUpdateDto, USER_INVITATION_SERVICE } from '../types/user-invitations.types';
import UserRoles from 'src/types/user-roles';
import { UuidPipe } from 'src/validation/uuid-pipe';
import { DisplayNameDto } from 'src/base-types/display-name';

@Controller('api/v1/user-invitations')
export class UserInvitationsController {
  constructor(
    @Inject(USER_INVITATION_SERVICE) private readonly userInvitationsService: IUserInvitationService,
  ) { }

  @Post()
  @Roles(UserRoles.ADMIN)
  async createAsync(
    @Body() userInvitationCreateDto: DisplayNameDto,
    @Payload() payload: IJwtPayload,
  ): Promise<IUserInvitation> {
    return this.userInvitationsService.createAsync(userInvitationCreateDto, payload.guid);
  }

  @Delete(':guid')
  @Roles(UserRoles.ADMIN)
  async deleteAsync(@Param('guid', new UuidPipe()) guid: string): Promise<void> {
    return this.userInvitationsService.deleteAsync(guid);
  }

  @Get()
  @Roles(UserRoles.ADMIN)
  async readAllAsync(): Promise<IUserInvitation[]> {
    return this.userInvitationsService.readAllAsync();
  }

  @Get(':guid')
  @Roles(UserRoles.ADMIN)
  async readAsync(@Param('guid', new UuidPipe()) guid: string): Promise<IUserInvitation> {
    return this.userInvitationsService.readAsync(guid);
  }

  @Put()
  @Roles(UserRoles.ADMIN)
  async updateAsync(
    @Body() userInvitationUpdateDto: UserInvitationUpdateDto,
    @Payload() payload: IJwtPayload,
  ): Promise<void> {
    return this.userInvitationsService.updateAsync(userInvitationUpdateDto, payload.guid);
  }
}
