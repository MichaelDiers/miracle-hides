import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignUpMutation } from '../app/api-users-slice';
import { useAppDispatch, useAppSelector, useReadCurrentLanguageCombinedQuery, useReadTranslationsCombinedQuery } from '../app/hooks';
import { selectUser } from '../app/selectors';
import { updateUserThunk } from '../app/user-slice';
import UserForm, { IUserFormSubmit } from '../components/UserForm';
import AppRoutes from '../types/app-routes.enum';
import { ITranslation } from '../types/translation.types.gen';
import { IUserSignUp } from '../types/user.types';
import BasePage from './BasePage';

export default function SignUp() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslation;
  const languagesResult =  useReadCurrentLanguageCombinedQuery();
  const language = languagesResult.data;

  const [signUp, signUpStatus] = useSignUpMutation();
  
  const [error, setError] = useState('');

  const user = useAppSelector(selectUser);
  
  const dispatch = useAppDispatch();
  
  const onSubmit = async (data: IUserFormSubmit): Promise<void> => {
    if (!data.displayName || !data.invitationCode) {
      return;
    }

    try {
      const request: IUserSignUp = {
        displayName: data.displayName,
        email: data.email,
        invitationCode: data.invitationCode,
        languageInternalName: language as string,
        password: data.password,
      };

      const user = await signUp(request).unwrap();
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
