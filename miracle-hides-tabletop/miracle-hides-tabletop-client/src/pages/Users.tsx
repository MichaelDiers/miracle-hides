import { Link } from 'react-router-dom';
import { useReadAllUsersQuery } from '../app/api-users-slice';
import BasePage from './BasePage';

export default function Users() {
  const usersResult = useReadAllUsersQuery();
  const users = usersResult?.data;

  return (
    <BasePage
      headline='USERS'
      isMain={true}
      apiData={usersResult}      
    >
      <div>
        {
          <div>
            <div>INVITATIONCODE</div>
            <div>DISPLAYNAME</div>
            <div>GUID</div>
            <div>ROLES</div>
          </div>
        }
        {
          users?.map(({ invitationCode, displayName, guid, roles }, i) => {
            return (
              <Link to={guid} key={`user_${i}`}>
                <div aria-label='INVITATIONCODE'>{invitationCode}</div>
                <div aria-label='DISPLAYNAME'>{displayName}</div>
                <div aria-label='GUID'>{guid}</div>
                <div aria-label='ROLES'>{roles}</div>
              </Link>
            )
          })
        }
      </div>
    </BasePage>
  )
}
