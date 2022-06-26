import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Redirect } from '@nestjs/common';
import { TokenDto } from 'src/dtos/token.dto';
import { AuthController } from '../auth/auth.controller';
import { CreateDto } from './create.dto';
import { DeleteDto } from './delete.dto';
import { UserService } from './user.service';
import { UsersListDto } from './users-list.dto';
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

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAsync(@Body() deleteDto: DeleteDto) : Promise<void> {
    await this.userService.deleteAsync(deleteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async readAsync() : Promise<UsersListDto> {
    return new UsersListDto(await this.userService.readAsync());
  }

  @Put()
  public async verifyEmailAsync(@Body() verifyEmailDto: VerifyEmailDto) : Promise<TokenDto> {
    console.log(verifyEmailDto)
    await this.userService.verifyEmailAsync(verifyEmailDto);
    console.log('huh?')
    return this.authController.signIn({ email: verifyEmailDto.email, password: verifyEmailDto.password });
  }
}
