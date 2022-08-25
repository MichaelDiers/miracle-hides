const enum UserRoles {
  ADMIN = 'ADMIN',
  POWERUSER = 'POWERUSER',
  READONLY = 'READONLY',
  USER = 'USER',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

export default UserRoles;

export const UserRolesList = [
  UserRoles.ADMIN,
  UserRoles.POWERUSER,
  UserRoles.READONLY,
  UserRoles.USER,
  UserRoles.VERIFY_EMAIL,
];
