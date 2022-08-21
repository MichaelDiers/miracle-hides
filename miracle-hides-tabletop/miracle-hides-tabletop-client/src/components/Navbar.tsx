import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useReadTranslationsCombinedQuery } from '../app/hooks';
import { userSlice } from '../app/user-slice';
import BasePage from '../pages/BasePage';
import AppRoutes from '../types/app-routes.enum';
import ITranslations from '../types/translations.interface';

export default function Navbar() {
  const trainslationsResult = useReadTranslationsCombinedQuery();
  const translations: ITranslations = trainslationsResult.data;
  const user = useAppSelector(state => state.user.current);
  const linksLeft : { name: string, link: string, onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }[] = [
    {
      name: translations?.navbar.home,
      link: AppRoutes.HOME,
    },
    {
      name: translations?.navbar.houseRules,
      link: AppRoutes.HOUSE_RULES,
    },
    {
      name: translations?.navbar.languages,
      link: AppRoutes.LANGUAGES,
    },
    {
      name: translations?.navbar.dashboard,
      link: AppRoutes.DASHBOARD,
    },
  ];

  const dispatch = useAppDispatch();
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {    
    event.preventDefault();
    dispatch(userSlice.actions.resetUser());
  }

  const linksRight : { name: string, link: string, onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }[] = [];
  if (user) {
    linksRight.push({
      name: translations?.navbar.signOut,
      link: AppRoutes.EVENT_HANDLED,
      onClick,
    });
  } else {
    linksRight.push({
      name: translations?.navbar.signIn,
      link: AppRoutes.SIGN_IN,
    });
    linksRight.push({
      name: translations?.navbar.signUp,
      link: AppRoutes.SIGN_UP,
    });
  }

  return (
    <BasePage
      apiData={trainslationsResult}
      isMain={false}
      headline=''>
      <nav>
        <ul>
          {
            linksLeft.map(({ name, link, onClick }, i) => (<li key={`nav_${i}`}><Link to={link} onClick={onClick}>{name}</Link></li>))
          }
        </ul>
        <ul>
          {
            linksRight.map(({ name, link, onClick }, i) => (<li key={`nav_${i}`}><Link to={link} onClick={onClick}>{name}</Link></li>))
          }
        </ul>                
      </nav>
    </BasePage>
  );
}
