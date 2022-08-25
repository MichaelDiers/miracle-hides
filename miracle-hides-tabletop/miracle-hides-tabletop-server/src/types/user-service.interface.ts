import UpdateUserDto from 'src/controllers/updateUser.dto';
import { IAutherizedEmailVerification, IUnautherizedEmailVerification } from './intersection-types';
import ISignInData from './sign-in-data.interface';
import ISignUpData from './sign-up-data.interface';
import ITokenResponse from './token-response.interface';
import IUserDto from './user-dto.interface';

export interface IUserService {
  createAsync(signUpData: ISignUpData): Promise<ITokenResponse>;
  deleteAsync(guid: string): Promise<void>;
  readAsync(guid: string): Promise<IUserDto>;
  readAllAsync(): Promise<IUserDto[]>;
  signInAsync(signInData: ISignInData): Promise<ITokenResponse>;
  updateAsync(user: UpdateUserDto): Promise<void>;
  verifyEmailAuthorized(autherizedEmailVerification: IAutherizedEmailVerification, token: string): Promise<ITokenResponse>;
  verifyEmailUnauthorized(unautherizedEmailVerification: IUnautherizedEmailVerification): Promise<ITokenResponse>;
}

export const USER_SERVICE = 'USER_SERVICE';
