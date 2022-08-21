import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSignInMutation } from '../app/api-sign-in.slice';
import { useAppDispatch, useAppSelector, useReadTranslationsCombinedQuery } from '../app/hooks';
import { selectUser } from '../app/selectors';
import { userSlice } from '../app/user-slice';
import UserForm, { IUserFormSubmit } from '../components/UserForm';
import AppRoutes from '../types/app-routes.enum';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function SignIn() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;
  const [signIn, signInStatus] = useSignInMutation();
  
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { state } = useLocation();
  const previous = (state ? (state as { from: string }).from : '') || AppRoutes.DASHBOARD;

  const user = useAppSelector(selectUser);
  
  const dispatch = useAppDispatch();
  
  const onSubmit = async (data: IUserFormSubmit): Promise<void> => {
    try {      
      const user = await signIn(data).unwrap();
      dispatch(userSlice.actions.updateUser(user));
    } catch (err) {
      setError('Cannot signin');
    }
  }

  if (user) {
    return (<Navigate to={previous}/>)
  }

  return (
    <BasePage
      headline={translations?.signIn.headline}
      apiData={[translationsResult, signInStatus]}
      isMain={true}>
      <UserForm
        email={email}
        onEmailChanged={(event) => setEmail(event.target.value)}
        password={password}
        onPasswordChanged={(event) => setPassword(event.target.value)}
        translations={translations?.userForm}
        isSignIn={true}
        onSubmit={onSubmit}
        error={error}
      />
    </BasePage>
  );
}
