import { useParams } from 'react-router-dom';
import { useReadUserQuery } from '../app/api-users-slice';
import BasePage from './BasePage';

export default function User() {
  const params = useParams();
  const guid = params.guid as string;
  const userResult = useReadUserQuery(guid);
  const user = userResult?.data;

  return (
    <BasePage
      headline='USER'
      isMain={true}
      apiData={userResult}      
    >
      <div>
        {
          <div>
            <div>CODE</div>
            <div>{user?.code}</div>
            <div>DISPLAYNAME</div>
            <div>{user?.displayName}</div>
            <div>GUID</div>
            <div>{user?.guid}</div>
            <div>ROLES</div>
            <div>{user?.roles}</div>
          </div>
        }
      </div>
    </BasePage>
  )
}
