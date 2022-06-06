import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authenticate(@Body() user: UserDto): Promise<string> {
    return this.authService.authenticateAsync(user);
  }

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<boolean> {
    return this.authService.createUser(user);
  }
}
