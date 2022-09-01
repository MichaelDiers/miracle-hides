import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDeleteUserInvitationMutation, useReadAllUserInvitationQuery, useUpdateUserInvitationMutation } from '../app/api-user-invitations-slice';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import AppRoutes from '../types/app-routes.enum';
import { ITranslation } from '../types/translation.types.gen';
import { IUserInvitation } from '../types/user-invitations.types';
import BasePage from './BasePage';

export default function UserInvitations() {
  // apis and mutations
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslation;
  const userInvitationsResult = useReadAllUserInvitationQuery();
  const userInvitations = userInvitationsResult.data as IUserInvitation[];
  const [deleteUserInvitation, deleteUserInvitationStatus] = useDeleteUserInvitationMutation();
  const [updateUserInvitation, updateUserInvitationStatus] = useUpdateUserInvitationMutation();

  // react states
  const [error, setError] = useState('');

  // page UserInvitationsCreate sets an array of created user invitations
  const { state } = useLocation();  
  const createdGuids = state ? (state as { guids: string[] }).guids : [];

  // delete an user invitation
  const onDelete = async (guid: string) => {
    deleteUserInvitation(guid)
      .unwrap()
      .catch((err) => {
        switch (err.status) {
          case 404:
            setError(translations?.invitations.notFound);
            break;
          default:
            setError(translations?.invitations.unspecificError);
            break;
        }
      });
  };

  // toggle an user invitation isActive status
  const onToggleActive = async (guid: string, isActive: boolean) => {
    updateUserInvitation({ guid, isActive: !isActive })
      .unwrap()
      .catch((err) => {
        switch (err.status) {
          case 404:
            setError(translations?.invitations.notFound);
            break;
          default:
            setError(translations?.invitations.unspecificError);
            break;
        }
      });
  }

  return (
    <BasePage
      headline={translations?.invitations?.headline}
      isMain={true}
      apiData={[
        translationsResult,
        userInvitationsResult,
        deleteUserInvitationStatus,
        updateUserInvitationStatus,
      ]}
      error={error}
    >
      <div>
        <button>
          <Link to={AppRoutes.USER_INVITATIONS_CREATE}>{translations?.invitations.create}</Link>
        </button>
        {        
          userInvitations?.map(({ displayName, guid,  invitationCode, isActive }, i) => {
            return (
              <div key={`invitation_${i}`} className={createdGuids.includes(guid)  ? 'new' : ''}>
                <div>{displayName}</div>
                <div>{guid}</div>
                <div>{isActive ? translations?.invitations.active : translations?.invitations.used}</div>
                <div>{invitationCode}</div>                
                <button onClick={() => onDelete(guid)}>{translations.invitations.delete}</button>
                <button onClick={() => onToggleActive(guid, isActive)}>
                  { 
                    isActive 
                      ? translations?.invitations.toggleToInactive 
                      : translations?.invitations.toggleToActive
                  }
                </button>
              </div>              
            )
          })
        }
        <button>
          <Link to={AppRoutes.USER_INVITATIONS_CREATE}>{translations?.invitations.create}</Link>
        </button>
      </div>
    </BasePage>
  );
}
