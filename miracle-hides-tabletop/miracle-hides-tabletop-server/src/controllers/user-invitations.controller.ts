import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Payload } from 'src/decorators/payload.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { IJwtPayload } from 'src/types/jwt-payload.interface';
import IUserInvitation from 'src/types/user-invitation.interface';
import IUserInvitationsService, { USER_INVITATION_SERVICE } from 'src/types/user-invitations-service.interface';
import { UuidPipe } from 'src/validation/uuid-pipe';
import { CreateUserInvitationsDto, DeleteUserInvitationsDto, UpdateUserInvitationsDto } from './user-invitations.dto';

@Controller('api/user-invitations')
export class UserInvitationsController {
  constructor(
    @Inject(USER_INVITATION_SERVICE) private readonly userInvitationsService: IUserInvitationsService,
  ) { }

  @Delete(':guid')
  @Roles(UserRoles.ADMIN)
  async deleteAsync(@Param('guid', new UuidPipe()) guid: string): Promise<void> {
    return this.userInvitationsService.deleteAsync(guid);
  }

  @Get()
  @Roles(UserRoles.ADMIN)
  async readAll(): Promise<IUserInvitation[]> {
    return this.userInvitationsService.readAllAsync();
  }

  @Get(':guid')
  @Roles(UserRoles.ADMIN)
  async read(@Param('guid', new UuidPipe()) guid: string): Promise<IUserInvitation> {
    return this.userInvitationsService.readAsync(guid);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  async createAsync(
    @Body() createUserInvitationsDto: CreateUserInvitationsDto,
    @Payload() payload: IJwtPayload,
  ): Promise<IUserInvitation> {
    return this.userInvitationsService.createAsync({
      creator: payload.guid,
      name: createUserInvitationsDto.name,
      email: createUserInvitationsDto.email,
    });
  }

  @Put()
  @Roles(UserRoles.ADMIN)
  async updateAsync(
    @Body() updateUserInvitationsDto: UpdateUserInvitationsDto,
    @Payload() payload: IJwtPayload,
  ): Promise<void> {
    return this.userInvitationsService.updateAsync({
      guid: updateUserInvitationsDto.guid,
      isActive: updateUserInvitationsDto.isActive,
      creator: payload.guid,
    });
  }
}
