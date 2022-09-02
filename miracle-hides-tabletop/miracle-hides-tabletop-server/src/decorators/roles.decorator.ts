import { SetMetadata } from '@nestjs/common';
import UserRoles from '../types/user-roles';

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
