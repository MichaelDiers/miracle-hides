import UserRoles from './user-roles';

export default interface IUserDto {
  code: string;
  displayName: string;
  guid: string;
  roles: UserRoles[];
}
