import { Body, Controller, Post } from '@nestjs/common';
import IUser from 'src/types/user.interface';
import SignUpDto from './sign-up.dto';

@Controller('api/sign-up')
export class SignUpController {
  @Post()
  async signUpAsync(@Body() signUpDto: SignUpDto): Promise<IUser> {
    return {
      name: signUpDto.email,
      token: signUpDto.password,
    };
  }
}
