import { ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IJwtPayload, ITokenResponse, IUser, IUserDatabaseService, IUserEmailVerification, IUserEmailVerificationWithPayload, IUserFrontEnd, IUserService, IUserSignIn, IUserSignUp, IUserUpdate, USER_DATABASE_SERVICE } from '../../types/user.types';
import { HASH_SERVICE, IHashService } from 'src/types/hash-service.interface';
import { IJwtService, JWT_SERVICE } from 'src/types/jwt-service.interface';
import { IUserInvitationService, USER_INVITATION_SERVICE } from '../../types/user-invitations.types';
import UserRoles from 'src/types/user-roles';
import { IMailerService, MAILER_SERVICE } from 'src/types/services/mailer-service.interface';
import { ITransactionFactory, TRANSACTION_FACTORY } from 'src/types/transaction.types';


@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(USER_DATABASE_SERVICE) private readonly databaseService: IUserDatabaseService,
    @Inject(USER_INVITATION_SERVICE) private readonly userInvitationsService: IUserInvitationService,
    @Inject(TRANSACTION_FACTORY) private readonly transactionFactory: ITransactionFactory,
    @Inject(MAILER_SERVICE) private readonly mailerService: IMailerService,
  ) {}

  async createAsync(userSignUp: IUserSignUp): Promise<ITokenResponse> {    
    // read invitation code
    let userInvitation;
    try {
      userInvitation = await this.userInvitationsService.readByInvitationCodeAsync(userSignUp.invitationCode);
    } catch (err) {
      throw new ForbiddenException();
    }

    if (!userInvitation.isActive) {
      throw new ForbiddenException();
    }

    //
    // first phase: start all promises
    //

    // start a transaction
    const transactionPromise = this.transactionFactory.createAsync();
  
    // check if user already exists
    const userExistsPromise = this.databaseService.findOneAsync(
      async (user) => await this.hashService.compareAsync(userSignUp.email, user.email) 
        || userSignUp.displayName.toUpperCase() === user.displayName.toUpperCase()
        || userSignUp.invitationCode === user.invitationCode,
    );

    // hash input data
    const emailPromise = this.hashService.hashAsync(userSignUp.email);
    const passwordPromise = this.hashService.hashAsync(userSignUp.password);

    const user: IUser = {
      displayName: userSignUp.displayName,
      email: await emailPromise,
      guid: uuidv4(),
      invitationCode: userSignUp.invitationCode,
      isEmailVerified: false,      
      languageInternalName: userSignUp.languageInternalName,
      password: await passwordPromise,
      roles: [UserRoles.USER],
      verificationCode: uuidv4(),
    };
  
    const tokenPromise = this.jwtService.signAsync({ ...user });

    // start transaction
    const transaction = await transactionPromise;

    const createPromise = this.databaseService.createAsync(user, transaction);
    
    //
    // second phase: check if all checks passed and commit or rollback
    //

    if (await userExistsPromise) {
      await transaction.abortTransactionAsync();
      throw new ConflictException();
    }

    if (await createPromise) {
      await transaction.commitTransactionAsync();
    } else {
      throw new InternalServerErrorException();
    }

    await this.mailerService.sendAsync({
      displayName: user.displayName,
      frontEndUrl: process.env.MH_FRONT_END_URL,
      language: userSignUp.languageInternalName,
      to: userSignUp.email,
      verificationCode: user.verificationCode,
    });

    // set user invitation to inactive
    this.userInvitationsService.updateAsync({
      guid: userInvitation.guid,
      isActive: false,
      },
      user.guid,
    ).catch((err) => {});

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

  async readAsync(guid: string): Promise<IUserFrontEnd> {
    const doc = await this.databaseService.findOneAsync(guid);
    if (!doc) {
      throw new NotFoundException();
    }

    return {
      displayName: doc.displayName,
      guid: doc.guid,
      invitationCode: doc.invitationCode,
      isEmailVerified: doc.isEmailVerified,
      languageInternalName: doc.languageInternalName,
      roles: doc.roles as UserRoles[],
      verificationCode: doc.verificationCode,
    };
  }

  async readAllAsync(): Promise<IUserFrontEnd[]> {
    const users = await this.databaseService.readAllAsync();
    return users.map(({
      displayName,
      guid,
      invitationCode,
      isEmailVerified,
      languageInternalName,
      roles,
      verificationCode,
    }) => ({
      displayName,
      guid,
      invitationCode,
      isEmailVerified,
      languageInternalName,
      roles: roles as UserRoles[],
      verificationCode,
    }));
  }

  async signInAsync(userSignIn: IUserSignIn): Promise<ITokenResponse> {
    const user = await this.databaseService.findOneAsync(
      async (user) => this.hashService.compareAsync(userSignIn.email, user.email),
    );

    if (!user) {
      throw new NotFoundException();
    }

    if (!await this.hashService.compareAsync(userSignIn.password, user.password)) {
      throw new NotFoundException();
    }

    const payload: IJwtPayload = {
      displayName: user.displayName,
      guid: user.guid,
      isEmailVerified: user.isEmailVerified,
      roles: user.roles as UserRoles[],
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async updateAsync(user: IUserUpdate, updateUser: string): Promise<void> {
    const result = await this.databaseService.updateAsync(user, updateUser);
    if(!result) {
      throw new NotFoundException();
    }
  }

  async verifyEmail(
    user: IUserEmailVerification | IUserEmailVerificationWithPayload)
  : Promise<ITokenResponse> {
    const userWithPayload = user as IUserEmailVerificationWithPayload;
    if (!userWithPayload.guid) {
      try {
        const { email, password, verificationCode } = user as IUserEmailVerification;
        const { token } = await this.signInAsync({ email, password })
        const payload = await this.jwtService.verifyAsync(token);
        return this.verifyEmail({
          ...payload,
          verificationCode,
        });
      } catch (err) {
        throw new UnauthorizedException();
      }
    }

    try {
      const databaseUser = await this.readAsync(userWithPayload.guid);
      if (!databaseUser || databaseUser.verificationCode !== userWithPayload.verificationCode) {
        throw new UnauthorizedException();
      }

      const userUpdate: IUserUpdate = {
        displayName: databaseUser.displayName,
        guid: databaseUser.guid,
        isEmailVerified: true,
        roles: databaseUser.roles
      };

      if (!await this.databaseService.updateAsync(userUpdate, databaseUser.guid)) {
        throw new UnauthorizedException();
      }

      return {
        token: await this.jwtService.signAsync({ ...databaseUser, isEmailVerified: true }),
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
