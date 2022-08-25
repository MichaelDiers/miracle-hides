import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../app/selectors';
import AppRoutes from '../types/app-routes.enum';
import UserRoles from '../types/user-roles';

export default function RequiresUser({
  children,
  isVerified = true,
  roles,
} : {
  children: JSX.Element,
  isVerified?: boolean,
  roles?: UserRoles[],
}) {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  if (!user) {
    return (<Navigate to={AppRoutes.SIGN_IN} state={{ from: location.pathname }}/>);
  }

  if (isVerified && !user.isVerified) {
    return (<Navigate to={AppRoutes.EMAIL_VERIFICATION_INTERN} state={{ from: location.pathname }}/>);
  }

  if (roles && (!user.roles || user.roles.every((role) => !roles.includes(role)))) {
    return (<Navigate to={AppRoutes.ERROR_LOST } />);
  }

  return children;
}
