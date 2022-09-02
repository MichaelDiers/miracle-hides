import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import UserRoles from '../types/user-roles';
import * as userTypes from '../types/user.types';
import { UuidPipe } from '../validation/uuid-pipe';
import { Payload } from '../decorators/payload.decorator';
import { IsPublic } from '../decorators/is-public.decorator';
import { VerificationCodeDto } from '../base-types/verification-code';

@Controller('api/v1/user')
export class UserController {
  constructor(
    @Inject(userTypes.USER_SERVICE) private readonly userService: userTypes.IUserService,
  ) {}

  @Delete(':guid')
  @Roles(UserRoles.ADMIN)
  async deleteAsync(
    @Param('guid', new UuidPipe()) guid: string
  ): Promise<void> {
    return this.userService.deleteAsync(guid);
  }

  @Get(':guid')
  @Roles(UserRoles.ADMIN)
  async readAsync(@Param('guid', new UuidPipe()) guid: string): Promise<userTypes.IUserFrontEnd> {
    return this.userService.readAsync(guid);
  }

  @Get()
  @Roles(UserRoles.ADMIN)
  async readAllAsync(): Promise<userTypes.IUserFrontEnd[]> {
    return this.userService.readAllAsync();
  }

  @Post('sign-in')
  @IsPublic()
  async signInAsync(@Body() user: userTypes.UserSignInDto): Promise<userTypes.ITokenResponse> {
    return this.userService.signInAsync(user);
  }

  @Post('sign-up')
  @IsPublic()
  async signUpAsync(@Body() user: userTypes.UserSignUpDto): Promise<userTypes.ITokenResponse> {
    return this.userService.createAsync(user);
  }

  @Patch('sign-up')
  @Roles(UserRoles.USER)
  async verifyEmailAuthorized(
    @Body() verificationCodeDto: VerificationCodeDto,
    @Payload() payload: userTypes.IJwtPayload,
  ): Promise<userTypes.ITokenResponse> {    
    return this.userService.verifyEmail({ ...verificationCodeDto, ...payload });
  }

  @Put('sign-up')
  @IsPublic()
  async verifyEmailUnauthorized(
    @Body() user: userTypes.UserEmailVerificationDto,
  ): Promise<userTypes.ITokenResponse> {
    return this.userService.verifyEmail(user);
  }

  @Put()
  @Roles(UserRoles.ADMIN)
  async updateAsync(
    @Body() user: userTypes.UserUpdateDto,
    @Payload() payload: userTypes.IJwtPayload,
  ): Promise<void> {
    return this.userService.updateAsync(user, payload.guid);
  }
}
