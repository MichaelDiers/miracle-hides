import { Body, ConflictException, Injectable, InternalServerErrorException, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
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
import { MailerService } from 'src/services/mailer/mailer.service';
import { DeleteDto } from './delete.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly invitationCodesDatabase: InvitationCodesDatabaseService,
    private readonly hashService: HashService,
    private readonly userDatabaseService: UsersDatabaseService,
    private readonly mailerService: MailerService,
  ) {}

  public async createAsync(createDto: CreateDto) : Promise<void> {
    const invitation = await this.invitationCodesDatabase.readByCodeAsync(createDto.invitationCode);
    if (!invitation) {
      throw new UnauthorizedException();
    }

    let user = await this.findUserAsync(createDto.email);
    if (user) {
      throw new ConflictException();
    }

    const emailVerificationCode = uuidv4();
    user = {
      displayName: createDto.email,
      email: await this.hashService.hash(createDto.email),
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

    if (!await this.invitationCodesDatabase.deleteByCodeAsync(createDto.invitationCode)) {
      throw new InternalServerErrorException();
    }

    await this.mailerService.sendMailAsync(createDto.email, emailVerificationCode);

    console.log(emailVerificationCode);
  }

  public async deleteAsync(deleteDto: DeleteDto) : Promise<void> {
    if (!await this.userDatabaseService.deleteAsync(deleteDto.userId)) {
      throw new NotFoundException();
    }
  }

  public async readAsync() : Promise<User[]> {
    const iterator = this.userDatabaseService.readAllAsync();
    let current = iterator.next();
    const users = [];
    while (!(await current).done) {
      const value = (await current).value;
      if (value) {
        users.push(...value);
      }

      current = iterator.next();
    }

    return users;
  }

  public async verifyEmailAsync(verifyEmailDto: VerifyEmailDto) : Promise<void> {
    const user = await this.userDatabaseService.findUserAsync(user => this.hashService.compare(verifyEmailDto.email, user.email));
    console.log(user)
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
