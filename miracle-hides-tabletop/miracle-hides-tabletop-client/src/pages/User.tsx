import { FormEvent, Fragment, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDeleteUserMutation, useReadUserQuery, useUpdateUserMutation } from '../app/api-users-slice';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import LabeledInput from '../components/LabeledInput';
import AppRoutes from '../types/app-routes.enum';
import UserRoles, { UserRolesList } from '../types/user-roles';
import { DISPLAY_NAME_MAX_LENGTH, DISPLAY_NAME_MIN_LENGTH } from '../validation/validation-constants';
import BasePage from './BasePage';

const DELETE_SOURCE = 'delete';
const UPDATE_SOURCE = 'update';

export default function User() {
  const params = useParams();
  const guid = params.guid as string;

  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data;
  const userResult = useReadUserQuery(guid);
  const user = userResult.data;

  const [deleteUser, deleteUserStatus] = useDeleteUserMutation();
  const [updateUser, updateUserStatus] = useUpdateUserMutation();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [displayNameError, setDisplayNameError] = useState('');

  const [roles, setRoles] = useState(
    user?.roles 
    ? UserRolesList.map((role) => user.roles.includes(role))
    : UserRolesList.map((role) => false)
  );

  const [rolesError, setRolesError] = useState('');

  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setRoles(UserRolesList.map((role) => user.roles.includes(role)));
    }
  }, [user]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const source = (event.nativeEvent as SubmitEvent).submitter?.id || '';
    if (!source || !user) {
      return;
    }

    if (source === DELETE_SOURCE) {
      deleteUser(user.guid)
        .unwrap()
        .then(() => {
          setIsDeleted(true);
        })
        .catch((err) => {
          switch (err.status) {
            case 404:
              setError('UNKNOWN USER');
              break;
            default:
              setError('ERROR');
              break;
          }
        });
    }

    if (source === UPDATE_SOURCE) {
      updateUser({
        code: user.code,
        displayName,
        guid: user.guid,
        roles: UserRolesList.filter((role, i) => roles[i]),
      }).unwrap().then(() => {
      }).catch((err) => {
        switch (err.status) {
          case 404:
            setError('UNKNOWN USER');
            break;
          default:
            setError('UNKNOWN ERROR');
            break;
        }
      });
      
    }
  }

  if (isDeleted) {
    return (<Navigate to={AppRoutes.USERS} />)
  }

  const updateDisabled = [
    !user,
    !displayName,
    displayNameError,
    !roles,
    rolesError,
    (displayName === user?.displayName && UserRolesList.every((role, i) => user.roles.includes(role) === roles[i]))
  ].some(Boolean);

  return (
    <BasePage
      headline='USER'
      isMain={true}
      apiData={[userResult, deleteUserStatus, updateUserStatus]}
      error={error}
    >
      <form onSubmit={onSubmit}>
        <div>{error}</div>
        <LabeledInput
          disabled={userResult.isLoading}
          error={displayNameError}
          errorUpdate={(error) => setDisplayNameError(error)}
          label={translations?.userForm.displayName}
          maxlength={DISPLAY_NAME_MAX_LENGTH}
          minlength={DISPLAY_NAME_MIN_LENGTH}
          name='displayName'
          onChange={(event) => setDisplayName(event.target.value)}
          required={true}
          translations={translations?.validation}
          type='text'
          value={displayName}
        />
        <LabeledInput
          isReadOnly={true}
          label={translations?.userForm.invitationCode}
          name='invitationCode'
          translations={translations?.validation}
          type='text'
          value={user?.guid || ''}
        />
        <fieldset>
          <>
            <legend>ROLES</legend>
            {
              UserRolesList.map((role, i) => (
                <Fragment key={role}>
                  <label htmlFor={`role_${i}`}>{role}</label>
                  <input type='checkbox' checked={roles[i]} onChange={() => { const selected = [...roles]; selected[i] = !selected[i]; setRoles(selected); }}></input>
                </Fragment>
              ))
            }
          </>
        </fieldset>
        <input
          type='submit'
          value={'UPDATE'}
          disabled={updateDisabled}
          id={UPDATE_SOURCE}
        ></input>
        <input
          type='submit'
          value={'DELETE'}
          disabled={!user}
          id={DELETE_SOURCE}
        ></input>        
      </form>
    </BasePage>
  )
}
