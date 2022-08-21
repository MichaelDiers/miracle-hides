import ISignUpData from './sign-up-data.interface';
import ITokenResponse from './token-response.interface';

export interface IUserService {
  createAsync(signUpData: ISignUpData): Promise<ITokenResponse>;
}

export const USER_SERVICE = 'USER_SERVICE';
