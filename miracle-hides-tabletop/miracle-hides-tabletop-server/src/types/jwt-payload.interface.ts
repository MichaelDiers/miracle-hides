import UserRoles from './user-roles';

export interface IJwtPayload {
  displayName: string;
  guid: string;
  isVerified: boolean;
  roles: UserRoles[];
};
