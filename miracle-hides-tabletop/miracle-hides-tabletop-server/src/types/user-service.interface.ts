import ISignInData from './sign-in-data.interface';
import ISignUpData from './sign-up-data.interface';
import ITokenResponse from './token-response.interface';

export interface IUserService {
  createAsync(signUpData: ISignUpData): Promise<ITokenResponse>;
  signInAsync(signInData: ISignInData): Promise<ITokenResponse>;
}

export const USER_SERVICE = 'USER_SERVICE';
