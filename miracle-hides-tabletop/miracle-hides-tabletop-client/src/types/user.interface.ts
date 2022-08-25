import UserRoles from './user-roles';

export default interface IUser {
  isVerified: boolean;
  name: string;
  roles: UserRoles[];
  token: string;
}
