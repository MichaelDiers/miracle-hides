import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  alive(): string {
    return this.authService.alive();
  }

  @Post()
  async authenticate(@Body() user: UserDto): Promise<string> {
    return this.authService.authenticateAsync(user);
  }
}
