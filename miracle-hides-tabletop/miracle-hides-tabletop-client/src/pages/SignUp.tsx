import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignUpMutation } from '../app/api-sign-up.slice';
import { useAppDispatch, useAppSelector, useReadTranslationsCombinedQuery } from '../app/hooks';
import { selectUser } from '../app/selectors';
import { userSlice } from '../app/user-slice';
import UserForm, { IUserFormSubmit } from '../components/UserForm';
import AppRoutes from '../types/app-routes.enum';
import ISignUp from '../types/sign-up.interface';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function SignUp() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;
  const [signUp, signUpStatus] = useSignUpMutation();
  
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepetition, setPasswordRepetition] = useState('');

  const user = useAppSelector(selectUser);
  
  const dispatch = useAppDispatch();
  
  const onSubmit = async (data: IUserFormSubmit): Promise<void> => {
    try {
      if (password !== passwordRepetition) {
        setError('Password mismatch')
      } else if (!displayName) {
        setError('Missing display name');
      } else {
        const request : ISignUp = {
          displayName: data.displayName as string,
          email: data.email,
          password: data.password,
        };

        const user = await signUp(request).unwrap();
        dispatch(userSlice.actions.updateUser(user));
      }      
    } catch (err) {
      setError('Cannot signin');
    }
  }

  if (user) {
    return (<Navigate to={AppRoutes.DASHBOARD}/>)
  }

  return (
    <BasePage
      headline={translations?.signUp?.headline}
      apiData={[translationsResult, signUpStatus]}
      isMain={true}>
      <UserForm
        displayName={displayName}
        onDisplayNameChanged={(event) => setDisplayName(event.target.value)}
        email={email}
        onEmailChanged={(event) => setEmail(event.target.value)}
        password={password}
        onPasswordChanged={(event) => setPassword(event.target.value)}
        passwordRepetition={passwordRepetition}
        onPasswordRepetitionChanged={(event) => setPasswordRepetition(event.target.value)}
        translations={translations?.userForm}
        isSignUp={true}
        onSubmit={onSubmit}
        error={error}
      />
    </BasePage>
  );
}
