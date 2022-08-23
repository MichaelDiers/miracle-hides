import UserRoles from './user-roles';

export default interface IUser {
  name: string;
  roles: UserRoles[];
  token: string;
}
