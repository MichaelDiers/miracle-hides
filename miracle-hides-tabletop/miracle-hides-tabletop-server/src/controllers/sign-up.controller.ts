import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IsPublic } from 'src/decorators/is-public.decorator';
import ITokenResponse from 'src/types/token-response.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';
import SignUpDto from './sign-up.dto';

@Controller('api/sign-up')
export class SignUpController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  @IsPublic()
  async signUpAsync(@Body() signUpDto: SignUpDto): Promise<ITokenResponse> {
    return this.userService.createAsync(signUpDto);
  }
}
