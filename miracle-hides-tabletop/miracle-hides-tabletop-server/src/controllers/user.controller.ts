import { Body, Controller, Delete, Get, Inject, Param, Put } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import IUserDto from 'src/types/user-dto.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';
import { UuidPipe } from 'src/validation/uuid-pipe';
import UpdateUserDto from './updateUser.dto';

@Controller('api/user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Delete(':guid')
  @Roles(UserRoles.ADMIN)
  async deleteAsync(@Param('guid', new UuidPipe()) guid: string): Promise<void> {
    return this.userService.deleteAsync(guid);
  }
  
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

  @Put()
  @Roles(UserRoles.ADMIN)
  async updateAsync(@Body() user: UpdateUserDto): Promise<void> {
    return this.userService.updateAsync(user);
  }
}
