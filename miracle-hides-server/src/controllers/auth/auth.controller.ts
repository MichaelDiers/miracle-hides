import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticateUserDto } from '../../dtos/authenticate-user.dto';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() user: CreateUserDto): Promise<void> {
    return this.authService.createUser(user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async authenticateUser(
    @Body() user: AuthenticateUserDto,
  ): Promise<string> {
    return this.authService.authenticateUser(user);
  }
}
