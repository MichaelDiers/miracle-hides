import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
