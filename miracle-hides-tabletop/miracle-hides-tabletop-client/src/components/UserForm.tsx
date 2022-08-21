import { ChangeEvent, FormEvent } from 'react';
import ITranslationsUserForm from '../types/translations-user-form.interface';
import LabeledInput from './LabeledInput';

export interface IUserFormSubmit {
  displayName?: string;
  email: string;
  password: string;
  passwordRepetition?: string;
}

export default function UserForm({
  displayName = '',
  onDisplayNameChanged = () => {},
  email = '',
  onEmailChanged = () => {},
  password = '',
  onPasswordChanged = () => {},
  passwordRepetition = '',
  onPasswordRepetitionChanged = () => {},
  translations,
  isSignIn = false,
  isSignUp = false,
  onSubmit = () => {},
  error,
} : {
  displayName?: string,
  onDisplayNameChanged?: (event: ChangeEvent<HTMLInputElement>) => void,
  email?: string
  onEmailChanged?: (event: ChangeEvent<HTMLInputElement>) => void,
  password?: string
  onPasswordChanged?: (event: ChangeEvent<HTMLInputElement>) => void,
  passwordRepetition?: string
  onPasswordRepetitionChanged?: (event: ChangeEvent<HTMLInputElement>) => void,
  translations: ITranslationsUserForm,
  isSignIn?: boolean,
  isSignUp?: boolean,
  onSubmit?: (data: IUserFormSubmit) => void,
  error?: string,
}) {
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data : IUserFormSubmit = {
      email,
      password,
    };

    if (isSignUp) {
      data.displayName = displayName;
      data.passwordRepetition = passwordRepetition;
    }

    onSubmit(data);
  }

  return (
    <form onSubmit={onFormSubmit}>
      {
        error ? <div>{error}</div> : null
      }
      <LabeledInput
        label={translations?.displayName}
        name='displayName'
        onChange={onDisplayNameChanged}
        value={displayName}
        show={isSignUp}
        type='text'
      />
      <LabeledInput
        label={translations?.email}
        name='email'
        onChange={onEmailChanged}
        value={email}
        show={isSignIn || isSignUp}
        type='email'
      />
      <LabeledInput
        label={translations?.password}
        name='password'
        onChange={onPasswordChanged}
        value={password}
        show={isSignIn || isSignUp}
        type='password'
      />
      <LabeledInput
        label={translations?.passwordRepetition}
        name='passwordRepetition'
        onChange={onPasswordRepetitionChanged}
        value={passwordRepetition}
        show={isSignUp}
        type='password'
      />
      {
        (isSignIn || isSignUp) 
          ? <input type='submit' value={(isSignIn ? translations?.signInSubmit : translations?.signUpSubmit) || ''}></input>
          : null
      }
    </form>
  )
}
