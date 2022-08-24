import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IsPublic } from 'src/decorators/is-public.decorator';
import ITokenResponse from 'src/types/token-response.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';
import SignInDto from './sign-in.dto';

@Controller('api/sign-in')
export class SignInController {
  constructor(
    @Inject(USER_SERVICE) private readonly userSercice: IUserService,
  ) {}

  @Post()
  @IsPublic()
  async signInAsync(@Body() signInDto: SignInDto): Promise<ITokenResponse> {
    return this.userSercice.signInAsync(signInDto);
  }
}
