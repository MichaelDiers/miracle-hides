import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TokenDto } from 'src/dtos/token.dto';
import { AuthenticateUserDto } from '../../dtos/authenticate-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() user: AuthenticateUserDto,
  ): Promise<TokenDto> {
    const token = await this.authService.signIn(user);
    return new TokenDto(token);
  }
}
