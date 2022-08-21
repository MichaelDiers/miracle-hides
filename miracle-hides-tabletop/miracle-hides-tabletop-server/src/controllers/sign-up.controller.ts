import { Body, ConflictException, Controller, Inject, Post } from '@nestjs/common';
import ITokenResponse from 'src/types/token-response.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';
import IUser from 'src/types/user.interface';
import SignUpDto from './sign-up.dto';

@Controller('api/sign-up')
export class SignUpController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  async signUpAsync(@Body() signUpDto: SignUpDto): Promise<ITokenResponse> {
    const reponse = await this.userService.createAsync(signUpDto);
    if (!reponse) {
      throw new ConflictException();
    } 

    return reponse;
  }
}
