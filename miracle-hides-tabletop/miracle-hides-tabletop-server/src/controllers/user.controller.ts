import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import IUserDto from 'src/types/user-dto.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';
import { UuidPipe } from 'src/validation/uuid-pipe';

@Controller('api/user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}
  
  @Get(':guid')
  @Roles(UserRoles.ADMIN)
  async readAsync(@Param('guid', new UuidPipe()) guid: string): Promise<IUserDto> {
    return this.userService.readAsync(guid);
  }

  @Get()
  @Roles(UserRoles.ADMIN)
  async readAllAsync(): Promise<IUserDto[]> {
    return this.userService.readAllAsync();
  }
}
