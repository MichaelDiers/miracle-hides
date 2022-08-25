import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignUpMutation } from '../app/api-sign-up.slice';
import { useAppDispatch, useAppSelector, useReadCurrentLanguageCombinedQuery, useReadTranslationsCombinedQuery } from '../app/hooks';
import { selectUser } from '../app/selectors';
import { updateUserThunk } from '../app/user-slice';
import UserForm, { IUserFormSubmit } from '../components/UserForm';
import AppRoutes from '../types/app-routes.enum';
import ISignUp from '../types/sign-up.interface';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function SignUp() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;
  const languagesResult =  useReadCurrentLanguageCombinedQuery();
  const language = languagesResult.data;

  const [signUp, signUpStatus] = useSignUpMutation();
  
  const [error, setError] = useState('');

  const user = useAppSelector(selectUser);
  
  const dispatch = useAppDispatch();
  
  const onSubmit = async (data: IUserFormSubmit): Promise<void> => {
    try {
      const request  = { ...data, language };
      const user = await signUp(request as ISignUp).unwrap();
      dispatch(updateUserThunk(user?.token));
    } catch (err) {
      const { status } = err as { status: number};
      switch (status) {
        case 409:
          setError(translations?.signUp.userExists);
          break;
        default:
          setError(translations?.signUp.cannotSignUp);
          break;
      } 
    }
  }

  if (user) {
    return (<Navigate to={AppRoutes.EMAIL_VERIFICATION_INTERN} />)
  }

  return (
    <BasePage
      headline={translations?.signUp?.headline}
      apiData={[translationsResult, signUpStatus, languagesResult]}
      isMain={true}>
      <UserForm
        translations={translations}
        isSignUp={true}
        onSubmit={onSubmit}
        error={error}
      />
    </BasePage>
  );
}
