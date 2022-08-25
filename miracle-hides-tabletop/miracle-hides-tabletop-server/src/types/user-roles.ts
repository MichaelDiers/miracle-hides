const enum UserRoles {
  ADMIN = 'ADMIN',
  POWERUSER = 'POWERUSER',
  READONLY = 'READONLY',
  USER = 'USER',
}

export default UserRoles;

export const UserRolesList = [
  UserRoles.ADMIN,
  UserRoles.POWERUSER,
  UserRoles.READONLY,
  UserRoles.USER,
];
