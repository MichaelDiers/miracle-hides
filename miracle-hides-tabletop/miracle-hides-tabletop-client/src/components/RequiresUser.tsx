import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../app/selectors';
import AppRoutes from '../types/app-routes.enum';

export default function RequiresUser({ children } : { children: JSX.Element}) {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  if (!user) {
    return (<Navigate to={AppRoutes.SIGN_IN} state={{ from: location.pathname }}/>);
  }

  return children;
}
