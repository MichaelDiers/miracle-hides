import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSignInMutation } from '../app/api-sign-in.slice';
import { useAppDispatch, useAppSelector, useReadTranslationsCombinedQuery } from '../app/hooks';
import { selectUser } from '../app/selectors';
import { updateUserThunk } from '../app/user-slice';
import UserForm, { IUserFormSubmit } from '../components/UserForm';
import AppRoutes from '../types/app-routes.enum';
import ITranslations from '../types/translations.interface';
import BasePage, { ERROR_FALLBACK } from './BasePage';

export default function SignIn() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;
  const [signIn, signInStatus] = useSignInMutation();
  
  const [error, setError] = useState('');
  
  const { state } = useLocation();
  const previous = (state ? (state as { from: string }).from : '') || AppRoutes.DASHBOARD;

  const user = useAppSelector(selectUser);
  
  const dispatch = useAppDispatch();
  
  const onSubmit = async (data: IUserFormSubmit): Promise<void> => {
    try {
      const user = await signIn(data).unwrap();
      dispatch(updateUserThunk(user?.token));
    } catch (err) {
      const { status } = err as { status: number};
      switch (status) {
        case 404:
          setError(translations?.signIn?.unknownUser || ERROR_FALLBACK);
          break;
        default:
          setError(translations?.signIn?.cannotSignIn || ERROR_FALLBACK);
          break;
      } 
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
        error={error}
        translations={translations}
        isSignIn={true}
        onSubmit={onSubmit}
      />
    </BasePage>
  );
}
