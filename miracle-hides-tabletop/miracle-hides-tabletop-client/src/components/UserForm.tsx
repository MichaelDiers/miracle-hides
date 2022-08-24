import { FormEvent, useState } from 'react';
import { ERROR_FALLBACK } from '../pages/BasePage';
import ITranslations from '../types/translations.interface';
import { DISPLAY_NAME_MAX_LENGTH, DISPLAY_NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, UUID_MAX_LENGTH, UUID_MIN_LENGTH, UUID_PATTERN, UUID_REGEX } from '../validation/validation-constants';
import LabeledInput from './LabeledInput';

export interface IUserFormSubmit {
  code?: string;
  displayName?: string;
  email: string;
  password: string;
}

export default function UserForm({
  error = '',
  translations,
  isSignIn = false,
  isSignUp = false,
  onSubmit = () => { },
}: {
  error?: string,
  translations: ITranslations,
  isSignIn?: boolean,
  isSignUp?: boolean,
  onSubmit?: (data: IUserFormSubmit) => void,
}) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('bar@bar.de');
  const [password, setPassword] = useState('bar@bar.de');
  const [passwordRepetition, setPasswordRepetition] = useState('');
  const [invitationCode, setInvitationCode] = useState('');

  const [displayNameError, setDisplayNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepetitionError, setPasswordRepetitionError] = useState('');
  const [invitationCodeError, setInvitationCodeError] = useState('');

  const onSubmitLocal = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData: IUserFormSubmit = {
      email,
      password,
    };

    if (isSignUp) {
      formData.code = invitationCode;
      formData.displayName = displayName;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  }

  const submitDisabled: boolean = (
    !email || emailError ||
    !password || passwordError ||
    (isSignUp && (!displayName || displayNameError) ||
      (isSignUp && (!passwordRepetition || passwordRepetitionError))) ||
    (isSignUp && password !== passwordRepetition) ||
    (isSignUp && (!invitationCode || invitationCodeError))
  ) as boolean;
  return (
    <form onSubmit={onSubmitLocal}>
      <div>{error}</div>
      <LabeledInput
        error={displayNameError}
        errorUpdate={(error) => setDisplayNameError(error)}
        label={translations?.userForm.displayName}
        maxlength={DISPLAY_NAME_MAX_LENGTH}
        minlength={DISPLAY_NAME_MIN_LENGTH}
        name='displayName'
        onChange={(event) => setDisplayName(event.target.value)}
        required={true}
        show={isSignUp}
        translations={translations?.validation} 
        type='text'
        value={displayName}
      />
      <LabeledInput
        error={emailError}
        errorUpdate={(error) => setEmailError(error)}
        label={translations?.userForm.email}
        name='email'
        onChange={(event) => setEmail(event.target.value)}
        required={true}
        show={isSignIn || isSignUp}
        translations={translations?.validation}
        type='email'
        value={email}
      />
      <LabeledInput
        error={passwordError || ((isSignUp && password !== passwordRepetition) ? (translations?.validation?.passwordMismatch || ERROR_FALLBACK) : '')}
        errorUpdate={(error) => setPasswordError(error)}
        label={translations?.userForm.password}
        maxlength={PASSWORD_MAX_LENGTH}
        minlength={PASSWORD_MIN_LENGTH}
        name='password'
        onChange={(event) => setPassword(event.target.value)}
        required={true}
        show={isSignIn || isSignUp}
        translations={translations?.validation} 
        type='password'
        value={password}
      />
      <LabeledInput
        error={passwordRepetitionError || ((isSignUp && password !== passwordRepetition) ? (translations?.validation?.passwordMismatch || ERROR_FALLBACK) : '')}
        errorUpdate={(error) => setPasswordRepetitionError(error)}
        label={translations?.userForm.passwordRepetition}
        maxlength={PASSWORD_MAX_LENGTH}
        minlength={PASSWORD_MIN_LENGTH}
        name='passwordRepetition'
        onChange={(event) => setPasswordRepetition(event.target.value)}
        required={true}
        show={isSignUp}
        translations={translations?.validation} 
        type='password'
        value={passwordRepetition}
      />
      <LabeledInput
        error={invitationCodeError}
        errorUpdate={(error) => setInvitationCodeError(error)}
        label={translations?.userForm.invitationCode}
        maxlength={UUID_MAX_LENGTH}
        minlength={UUID_MIN_LENGTH}
        name='passwordRepetition'
        onChange={(event) => setInvitationCode(event.target.value)}
        pattern={UUID_PATTERN}
        required={true}
        show={isSignUp}
        translations={translations?.validation} 
        type='text'
        value={invitationCode}
      />
      <input
        type='submit'
        value={(isSignIn ? translations?.userForm.signInSubmit : translations?.userForm.signUpSubmit) || ''}
        disabled={submitDisabled}
      ></input>
    </form>
  )
}
