import { Body, Controller, Post } from '@nestjs/common';
import IUser from 'src/types/user.interface';
import SignInDto from './sign-in.dto';

@Controller('api/sign-in')
export class SignInController {
  @Post()
  signIn(@Body() signInDto: SignInDto): IUser {
    return {
      name: signInDto.email,
      token: signInDto.password,
    };
  }
}
