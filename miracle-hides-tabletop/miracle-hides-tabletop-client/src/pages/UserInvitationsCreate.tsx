import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCreateUserInvitationMutation } from '../app/api-user-invitations-slice';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import LabeledInput from '../components/LabeledInput';
import AppRoutes from '../types/app-routes.enum';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

const DONE_SOURCE = 'done';
const NEXT_SOURCE = 'next';

export default function UserInvitationsCreate() {
  // api calls and mutations
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;
  const [createUserInvitation, createUserInvitationStatus] = useCreateUserInvitationMutation();

  // react states
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createdGuids, setCreatedGuids] = useState<string[]>([]);
  const [createdFromSource, setCreatedFromSource] = useState('');

  // create a new user invitation on submit
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const source = (event.nativeEvent as SubmitEvent).submitter?.id || '';
    
    createUserInvitation({ name, email })
      .unwrap()
      .then((result) => {
        setCreatedGuids([...createdGuids, result.guid]);
        setCreatedFromSource(source);
        setName('');
        setEmail('');
      }).catch((err) => {
        switch (err.status) {
          case 409:
            setError(translations?.invitationsCreate.conflict);
            break;
          default:
            setError(translations?.invitationsCreate.unspecificError);
            break;
        }
      });
  }

  if (createdFromSource === DONE_SOURCE) {
    return (<Navigate to={AppRoutes.USER_INVITATIONS} state={{ guids: createdGuids }} />);
  }

  return (
    <BasePage
      headline={translations?.invitationsCreate.headline}
      isMain={true}
      apiData={[translationsResult, createUserInvitationStatus]}
      error={error}
    >
      <>
        <form onSubmit={onSubmit}>
          <LabeledInput
            label={translations?.common.name}
            name='name'
            type='text'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={translations?.common.namePlaceholder}
            required={true}
            minlength={3}
          ></LabeledInput>
          <LabeledInput
            label={translations?.common.email}
            name='email'
            placeholder={translations?.common.emailPlaceholder}
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></LabeledInput>
          <input type='submit' value={translations?.invitationsCreate.createAndDone} id={DONE_SOURCE} />
          <input type='submit' value={translations?.invitationsCreate.createAndNext} id={NEXT_SOURCE} />
        </form>
        <button onClick={() => setCreatedFromSource(DONE_SOURCE)}>{translations.common.back}</button>
      </>
    </BasePage>
  );
}
