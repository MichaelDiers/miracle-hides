import { IsIn } from 'class-validator';
import UserRoles, { UserRolesList } from 'src/types/user-roles';
import createSchemaEntry from './create-schema-entry';

export const rolesSchemaEntry = () => createSchemaEntry({
  stringEnum: UserRolesList,
  name: 'roles',
  type: [String],
});

export interface IDatabaseRoles {
  roles: string[];
}

export interface IRoles {
  roles: UserRoles[];
}

export interface IRolesDto {
  roles: string[];
}

export class RolesDto implements IRolesDto {
  @IsIn(UserRolesList, { each: true })
  roles: UserRoles[];
}
