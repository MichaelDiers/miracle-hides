import ISignIn from './sign-in.interface';

export default interface ISignUp extends ISignIn {
  displayName: string;
  language: string;
}
