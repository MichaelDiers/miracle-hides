import ISignInData from './sign-in-data.interface';

export default interface ISignUpData extends ISignInData {
  displayName: string;
}
