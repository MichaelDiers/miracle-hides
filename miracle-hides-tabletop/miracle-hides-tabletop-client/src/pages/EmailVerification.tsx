import { FormEvent, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useVerifyEmailAuthorizedMutation, useVerifyEmailUnauthorizedMutation } from '../app/api-sign-up.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../app/selectors';
import { updateUserThunk } from '../app/user-slice';
import LabeledInput from '../components/LabeledInput';
import AppRoutes from '../types/app-routes.enum';
import { UUID_MAX_LENGTH, UUID_MIN_LENGTH, UUID_PATTERN } from '../validation/validation-constants';
import BasePage from './BasePage';

export default function EmailVerification() {
  const dispatch = useAppDispatch();
  const { code, email } = useParams();
  
  const [verifyEmailAuthorized, verifyEmailAuthorizedStatus] = useVerifyEmailAuthorizedMutation();
  const [verifyEmailUnauthorized, verifyEmailUnauthorizedStatus] = useVerifyEmailUnauthorizedMutation();

  const [userEmail, setUserEmail] = useState(email || '');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState(code || '');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const user = useAppSelector(selectUser);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    if (user) {
      verifyEmailAuthorized({ verificationCode })
        .unwrap()
        .then(({ token }) => {
          dispatch(updateUserThunk(token));
          setIsVerified(true);
        }).catch((err) => {
          setError('ERROR');
        });
    } else {
      verifyEmailUnauthorized({ email: userEmail, password, verificationCode })
        .unwrap()
        .then(({ token }) => {
          dispatch(updateUserThunk(token));
          setIsVerified(true);
        }).catch((err) => {
          setError('ERROR');
        });
    }
  }

  if (isVerified) {
    return (<Navigate to={AppRoutes.DASHBOARD}/>)
  }

  return (
    <BasePage
      headline='EMAIL VERIFICATION'
      isMain={true}
      apiData={[verifyEmailAuthorizedStatus, verifyEmailUnauthorizedStatus]}
    >
      <form onSubmit={onSubmit}>
        {
          user
            ? null
            : <LabeledInput
                label='EMAIL'
                name='email'
                type='email'
                onChange={(event) => setUserEmail(event.target.value)}                
                required={true}
                value={userEmail}
              />
        }
        {
          user
            ? null
            : <LabeledInput
                label='PASSWORD'
                name='password'
                onChange={(event) => setPassword(event.target.value)}
                type='password'
                required={true}
                value={password}
              />
        }
        <LabeledInput
          label='CODE'
          name='code'
          type='text'
          error={error}
          minlength={UUID_MIN_LENGTH}
          maxlength={UUID_MAX_LENGTH}
          onChange={(event) => setVerificationCode(event.target.value)}
          pattern={UUID_PATTERN}
          required={true}
          value={code}
        />
        <button
          type='submit'
        >VERIFY</button>
      </form>
    </BasePage>
  )
}
