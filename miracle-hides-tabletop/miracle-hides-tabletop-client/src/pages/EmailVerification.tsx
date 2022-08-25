import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LabeledInput from '../components/LabeledInput';
import AppRoutes from '../types/app-routes.enum';
import { UUID_MAX_LENGTH, UUID_MIN_LENGTH, UUID_PATTERN } from '../validation/validation-constants';
import BasePage from './BasePage';

export default function EmailVerification() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit = () => {
    setIsVerified(true);
  }

  if (isVerified) {
    // Todo: token!
    return (<Navigate to={AppRoutes.DASHBOARD}/>)
  }

  return (
    <BasePage
      headline='EMAIL VERIFICATION'
      isMain={true}
    >
      <form onSubmit={onSubmit}>
        <LabeledInput
          label='CODE'
          name='code'
          type='text'
          error={error}
          minlength={UUID_MIN_LENGTH}
          maxlength={UUID_MAX_LENGTH}
          pattern={UUID_PATTERN}
          onChange={(event) => setCode(event.target.value)}
          required={true}
        />
        <button
          type='submit'
        >VERIFY</button>
      </form>
    </BasePage>
  )
}
