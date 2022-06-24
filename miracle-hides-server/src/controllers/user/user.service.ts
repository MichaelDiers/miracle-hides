import { ConflictException, Injectable, InternalServerErrorException, Res, UnauthorizedException } from '@nestjs/common';
import { InvitationCodesDatabaseService } from 'src/databases/invitation-codes-database/invitation-codes-database.service';
import { UsersDatabaseService } from 'src/databases/users-database/users-database.service';
import { InvitationCode } from 'src/dtos/invitation-code.interface';
import { HashService } from 'src/services/hash/hash.service';
import { CreateDto } from './create.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/dtos/user.interface';
import { response } from 'express';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { TokenDto } from 'src/dtos/token.dto';
import { VerifyEmailDto } from './verify-email.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly invitationCodesDatabase: InvitationCodesDatabaseService,
    private readonly hashService: HashService,
    private readonly userDatabaseService: UsersDatabaseService,
  ) {}

  public async createAsync(createDto: CreateDto) : Promise<void> {
    const invitation = await this.invitationCodesDatabase.readByCodeAsync(createDto.code);
    if (!invitation || !await this.hashService.compare(createDto.email, invitation.email)) {
      throw new UnauthorizedException();
    }

    let user = await this.findUserAsync(createDto.email);
    if (user) {
      throw new ConflictException();
    }

    const emailVerificationCode = uuidv4();
    user = {
      displayName: createDto.email,
      email: invitation.email,
      forcePasswordChange: false,
      isLocked: false,
      lockedReason: '',
      password: await this.hashService.hash(createDto.password),
      signInAttemptFailures: 0,
      userId: uuidv4(),
      emailVerificationCode: await this.hashService.hash(emailVerificationCode),
      isEmailVerified: false,
    };

    await this.userDatabaseService.createAsync(user);

    if (!await this.invitationCodesDatabase.deleteByCodeAsync(createDto.code)) {
      throw new InternalServerErrorException();
    }

    console.log(emailVerificationCode);
  }

  public async verifyEmailAsync(verifyEmailDto: VerifyEmailDto) : Promise<void> {
    const user = await this.userDatabaseService.findUserAsync(user => this.hashService.compare(verifyEmailDto.email, user.email));
    if (!user 
      || !await this.hashService.compare(verifyEmailDto.password, user.password)
      || !await this.hashService.compare(verifyEmailDto.verificationCode, user.emailVerificationCode)) {
      throw new UnauthorizedException();
    }

    if (!await this.userDatabaseService.setEmailIsVerfiedAsync(user)) {
      throw new InternalServerErrorException();
    }
  }

  private async findUserAsync(email: string) : Promise<User | undefined> {
    const iterator = this.userDatabaseService.readAllAsync();
    let current = iterator.next();
    while (!(await current).done) {
      const users = (await current).value;
      if (users) {
        const results = await Promise.all(users.map((user) => this.hashService.compare(email, user.email)));
        const index = results.findIndex(result => result);
        if (index > -1) {
          return users[index];
        }
      }

      current = iterator.next();
    }
  }
}
