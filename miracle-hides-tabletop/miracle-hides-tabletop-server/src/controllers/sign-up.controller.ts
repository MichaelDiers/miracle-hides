import { Body, Controller, Headers, Inject, Patch, Post, Put } from '@nestjs/common';
import { IsPublic } from 'src/decorators/is-public.decorator';
import ITokenResponse from 'src/types/token-response.interface';
import { IUserService, USER_SERVICE } from 'src/types/user-service.interface';
import { AutherizedEmailVerificationDto, UnautherizedEmailVerificationDto } from './intersection-dtos';
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

  @Put()
  @IsPublic()
  async verifyEmailUnauthorized(
    @Body() unautherizedEmailVerificationDto: UnautherizedEmailVerificationDto,
  ): Promise<ITokenResponse> {
    return this.userService.verifyEmailUnauthorized(unautherizedEmailVerificationDto);
  }

  @Patch()
  @IsPublic()
  async verifyEmailAuthorized(
    @Body() autherizedEmailVerificationDto: AutherizedEmailVerificationDto,
    @Headers('authorization') authorizationHeader: string,
  ): Promise<ITokenResponse> {
    const token = authorizationHeader.split(' ')[1];
    return this.userService.verifyEmailAuthorized(autherizedEmailVerificationDto, token);
  }
}
