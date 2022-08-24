import { Controller, Get, Inject } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import IUserDto from 'src/types/user-dto.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';

@Controller('api/user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}
  
  @Get()
  @Roles(UserRoles.ADMIN)
  async readAsync(): Promise<IUserDto[]> {
    return this.userService.readAllAsync();
  }
}
