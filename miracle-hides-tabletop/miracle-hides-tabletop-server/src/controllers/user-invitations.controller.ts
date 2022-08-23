import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import IUserInvitationsList from 'src/types/user-invitations-list.interface';

@Controller('api/user-invitations')
export class UserInvitationsController {
  @Get()
  @Roles(UserRoles.ADMIN)
  async list(): Promise<IUserInvitationsList> {
    return {      
    };
  }
}
