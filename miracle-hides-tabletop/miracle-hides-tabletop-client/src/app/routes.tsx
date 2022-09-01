import Dashboard from '../pages/Dashboard';
import EmailVerification from '../pages/EmailVerification';
import Home from '../pages/Home';
import HouseRules from '../pages/HouseRules';
import Language from '../pages/Language';
import Lost from '../pages/Lost';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import User from '../pages/User';
import UserInvitations from '../pages/UserInvitations';
import UserInvitationsCreate from '../pages/UserInvitationsCreate';
import Users from '../pages/Users';
import AppRoutes from '../types/app-routes.enum'
import { ITranslationNavbar } from '../types/translation.types.gen';
import UserRoles from '../types/user-roles';

interface IRouteElement {
  element: JSX.Element;
  hideIfUser: boolean;
  isVerified?: boolean;
  navbar: boolean;
  path: string;
  translate: (translations: ITranslationNavbar) => string;
  roles: UserRoles[],
  requiresUser: boolean;
}

const ROUTES: IRouteElement[] = [
  {
    element: (<Home />),
    hideIfUser: false,
    navbar: true,
    path: AppRoutes.INDEX,
    roles: [],
    translate: (translations: ITranslationNavbar) => translations?.home || '',
    requiresUser: false,
  },
  {
    path: AppRoutes.HOUSE_RULES,
    element: (<HouseRules />),
    translate: (translations: ITranslationNavbar) => translations?.houseRules || '',
    navbar: true,
    hideIfUser: false,
    roles: [UserRoles.USER],
    requiresUser: false,
  },
  {
    path: AppRoutes.LANGUAGES,
    element: (<Language />),
    translate: (translations: ITranslationNavbar) => translations?.languages || '',
    navbar: true,
    hideIfUser: false,
    roles: [],
    requiresUser: false,
  },
  {
    path: AppRoutes.SIGN_IN,
    element: (<SignIn />),
    translate: (translations: ITranslationNavbar) => translations?.signIn || '',
    navbar: true,
    hideIfUser: true,
    roles: [],
    requiresUser: false,
  },
  {
    path: AppRoutes.SIGN_UP,
    element: (<SignUp />),
    translate: (translations: ITranslationNavbar) => translations?.signUp || '',
    navbar: true,
    hideIfUser: true,
    roles: [],
    requiresUser: false,
  },
  {
    path: AppRoutes.ERROR_LOST,
    element: (<Lost />),
    navbar: false,
    roles: [],
    hideIfUser: false,
    translate: () => '',
    requiresUser: false,
  },

  {
    path: AppRoutes.DASHBOARD,
    element: (<Dashboard />),
    navbar: true,
    translate: (translations: ITranslationNavbar) => translations?.dashboard || '',
    hideIfUser: false,
    roles: [UserRoles.USER],
    requiresUser: true,
  },
  {
    path: AppRoutes.USER_INVITATIONS,
    element: (<UserInvitations />),
    roles: [UserRoles.ADMIN],
    navbar: true,
    translate: (translations: ITranslationNavbar) => translations?.invitations,
    hideIfUser: false,
    requiresUser: true,
  },
  {
    path: `${AppRoutes.USER_INVITATIONS}/${AppRoutes.USER_INVITATIONS_CREATE}`,
    element: (<UserInvitationsCreate />),
    roles: [UserRoles.ADMIN],
    navbar: false,
    translate: (translations: ITranslationNavbar) => 'CREATE',
    hideIfUser: false,
    requiresUser: true,
  },
  {
    path: AppRoutes.USERS,
    element: (<Users />),
    roles: [UserRoles.ADMIN],
    navbar: true,
    translate: (translations: ITranslationNavbar) => 'USERS',
    hideIfUser: false,
    requiresUser: true,
  },
  {
    path: AppRoutes.USER,
    element: (<User />),
    roles: [UserRoles.ADMIN],
    navbar: false,
    translate: (translations: ITranslationNavbar) => 'USER',
    hideIfUser: false,
    requiresUser: true,
  },
  {
    path: AppRoutes.EMAIL_VERIFICATION_INTERN,
    element: (<EmailVerification />),
    isVerified: false,
    roles: [],
    navbar: false,
    translate: (translations: ITranslationNavbar) => 'EMAIL_VERIFICATION',
    hideIfUser: false,
    requiresUser: false,
  },
  {
    path: AppRoutes.EMAIL_VERIFICATION_EXTERN,
    element: (<EmailVerification />),
    isVerified: false,
    roles: [],
    navbar: false,
    translate: (translations: ITranslationNavbar) => 'EMAIL_VERIFICATION',
    hideIfUser: false,
    requiresUser: false,
  },
];

export default ROUTES;
