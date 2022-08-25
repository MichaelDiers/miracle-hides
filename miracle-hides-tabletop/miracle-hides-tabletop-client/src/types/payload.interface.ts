import UserRoles from './user-roles';

export default interface IPayload {
  displayName: string;
  isVerified: boolean;
  roles: UserRoles[];
}
