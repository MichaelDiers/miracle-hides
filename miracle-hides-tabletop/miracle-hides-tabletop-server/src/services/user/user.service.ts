import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import ISignUpData from 'src/types/sign-up-data.interface';
import ITokenResponse from 'src/types/token-response.interface';
import { IUserDatabaseService, USER_DATABASE_SERVICE } from 'src/types/user-database-service.interface';
import { IUserService } from 'src/types/user-service.interface';
import { HASH_SERVICE, IHashService } from 'src/types/hash-service.interface';
import ISignInData from 'src/types/sign-in-data.interface';
import { IJwtService, JWT_SERVICE } from 'src/types/jwt-service.interface';
import IUserInvitationsService, { USER_INVITATION_SERVICE } from 'src/types/user-invitations-service.interface';
import IUserInvitation from 'src/types/user-invitation.interface';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import IUserDto from 'src/types/user-dto.interface';
import UpdateUserDto from 'src/controllers/updateUser.dto';
import UserRoles from 'src/types/user-roles';
import { IMailerService, MAILER_SERVICE } from 'src/types/services/mailer-service.interface';
import { IAutherizedEmailVerification, IUnautherizedEmailVerification } from 'src/types/intersection-types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(USER_DATABASE_SERVICE) private readonly databaseService: IUserDatabaseService,
    @Inject(USER_INVITATION_SERVICE) private readonly userInvitationsService: IUserInvitationsService,
    @InjectConnection() private readonly connection: Connection,
    @Inject(MAILER_SERVICE) private readonly mailerService: IMailerService,
  ) {}

  async createAsync(signUpData: ISignUpData): Promise<ITokenResponse> {
    //
    // first phase: start all promises
    //

    // start a session
    const sessionPromise = this.connection.startSession();

    // read invitation code
    const userInvitationPromise = this.userInvitationsService.readByCodeAsync(signUpData.code);

    // check if user already exists
    const userExistsPromise = this.databaseService.findOneAsync(
      async (user) => await this.hashService.compareAsync(signUpData.email, user.email) 
        || signUpData.displayName.toUpperCase() === user.displayName.toUpperCase()
        || signUpData.code === user.code,
    );

    // hash input data
    const emailPromise = this.hashService.hashAsync(signUpData.email);
    const passwordPromise = this.hashService.hashAsync(signUpData.password);

    const user = {
      ...signUpData,
      email: await emailPromise,
      emailIsVerified: false,
      guid: uuidv4(),
      isVerified: false,
      password: await passwordPromise,
      roles: [UserRoles.USER],
      verification: uuidv4(),
    };

    const tokenPromise = this.jwtService.signAsync({ ...user });

    // start transaction
    const session = await sessionPromise;
    session.startTransaction();

    const createPromise = this.databaseService.createAsync(user, session);
    
    //
    // second phase: check if all checks passed and commit or rollback
    //

    // check invitation code results
    let userInvitation: IUserInvitation;
    try {
      userInvitation = await userInvitationPromise;
    } catch (err) {
      // invitation does not exists
    }

    if (!userInvitation || !userInvitation.isActive) {
      await session.abortTransaction();
      throw new ForbiddenException();
    }

    if (await userExistsPromise) {
      await session.abortTransaction();
      throw new ConflictException();
    }

    try {
      await createPromise;
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new ConflictException();
    }

    await this.mailerService.sendAsync({
      displayName: user.displayName,
      frontEndUrl: process.env.MH_FRONT_END_URL,
      language: signUpData.language,
      to: signUpData.email,
      verificationCode: user.code,
    });

    // set user invitation to inactive
    this.userInvitationsService.updateAsync({
      guid: userInvitation.guid,
      isActive: false,
      creator: user.guid,
    }).catch((err) => {});

    return {
      token: await tokenPromise,
    };
  }

  async deleteAsync(guid: string): Promise<void> {
    const result = await this.databaseService.deleteAsync(guid);
    if (!result) {
      throw new NotFoundException();
    }
  }

  async readAsync(guid: string): Promise<IUserDto> {
    const doc = await this.databaseService.findOneAsync(guid);
    if (!doc) {
      throw new NotFoundException();
    }

    return {
      code: doc.code,
      displayName: doc.displayName,
      guid: doc.guid,
      roles: doc.roles,
    };
  }

  async readAllAsync(): Promise<IUserDto[]> {
    const users = await this.databaseService.readAllAsync();
    return users.map(({
      code,
      displayName,
      guid,
      roles,
    }) => ({
      code,
      displayName,
      guid,
      roles
    }));
  }

  async signInAsync(signInData: ISignInData): Promise<ITokenResponse> {
    const user = await this.databaseService.findOneAsync(
      async (user) => this.hashService.compareAsync(signInData.email, user.email),
    );

    if (!user) {
      throw new NotFoundException();
    }

    if (!await this.hashService.compareAsync(signInData.password, user.password)) {
      throw new NotFoundException();
    }

    return {
      token: await this.jwtService.signAsync(user),
    };
  }

  async updateAsync(user: UpdateUserDto): Promise<void> {
    const result = await this.databaseService.updateAsync(user);
    if(!result) {
      throw new NotFoundException();
    }
  }

  async verifyEmailAuthorized(
    autherizedEmailVerification: IAutherizedEmailVerification,
    token: string,
  ): Promise<ITokenResponse> {
    try {
      const { guid } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const user = await this.readAsync(guid);

      if (user.code !== autherizedEmailVerification.verificationCode) {
        throw new UnauthorizedException();
      }

      if (!await this.databaseService.updateAsync({
        guid: user.guid,
        isVerified: true,
        displayName: user.displayName,
        roles: user.roles,
       })) {
        throw new UnauthorizedException();
      }
      
      return {
        token: await this.jwtService.signAsync({ ...user, isVerified: true }),
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async verifyEmailUnauthorized(
    unautherizedEmailVerification: IUnautherizedEmailVerification,
  ): Promise<ITokenResponse> {
    const {
      email,
      password,
      verificationCode,
    } = unautherizedEmailVerification;
    const { token } = await this.signInAsync({ email, password });
    return this.verifyEmailAuthorized({ verificationCode }, token);
  }
  
}
