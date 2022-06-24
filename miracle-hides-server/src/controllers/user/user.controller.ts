import { Body, Controller, HttpCode, HttpStatus, Post, Put, Redirect } from '@nestjs/common';
import { TokenDto } from 'src/dtos/token.dto';
import { AuthController } from '../auth/auth.controller';
import { CreateDto } from './create.dto';
import { UserService } from './user.service';
import { VerifyEmailDto } from './verify-email.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authController: AuthController,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createAsync(@Body() createDto: CreateDto): Promise<void> {
    await this.userService.createAsync(createDto);
  }

  @Put()
  public async verifyEmailAsync(@Body() verifyEmailDto: VerifyEmailDto) : Promise<TokenDto> {
    await this.userService.verifyEmailAsync(verifyEmailDto);
    return this.authController.signIn({ email: verifyEmailDto.email, password: verifyEmailDto.password });
  }
}
