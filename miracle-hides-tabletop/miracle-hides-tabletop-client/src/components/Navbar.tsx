import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useReadTranslationsCombinedQuery } from '../app/hooks';
import ROUTES from '../app/routes';
import { userSlice } from '../app/user-slice';
import BasePage from '../pages/BasePage';
import AppRoutes from '../types/app-routes.enum';
import { ITranslation } from '../types/translation.types.gen';

export default function Navbar() {
  const trainslationsResult = useReadTranslationsCombinedQuery();
  const translations: ITranslation = trainslationsResult.data;
  const user = useAppSelector(state => state.user.current);

  const dispatch = useAppDispatch();
  const onSignOut = (event: MouseEvent<HTMLAnchorElement>) => {    
    event.preventDefault();
    dispatch(userSlice.actions.resetUser());
  }

  const links = ROUTES
    .filter(({ navbar }) => navbar)
    .filter(({ hideIfUser }) => !user || !hideIfUser)
    .filter(({ requiresUser }) => !requiresUser || user)
    .filter(({ roles }) => roles.length === 0 || roles.some((role) => user?.roles.includes(role)));

  return (
    <BasePage
      apiData={trainslationsResult}
      isMain={false}
      headline=''>
      <nav>
        <ul>
          {
            links.map(({ path, translate }, i) => {
              return (
                <li key={`nav_${i}`}>
                  <Link to={path}>
                    { translate ? translate(translations?.navbar) : 'ERROR' }
                  </Link>
                </li>
              )
            })
          }
          {
            user 
              ? <li>
                  <Link
                    to={AppRoutes.EVENT_HANDLED}
                    onClick={onSignOut}>
                      {translations?.navbar.signOut}
                  </Link>
                </li> 
              : null
          }
        </ul>
      </nav>
    </BasePage>
  );
}
