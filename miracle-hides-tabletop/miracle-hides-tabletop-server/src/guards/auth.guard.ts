import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request?.payload?.roles;
    if (!userRoles || userRoles.length === 0) {
      return false;
    }

    return userRoles.some((userRole) => roles.some((requiredRole) => userRole === requiredRole));
  }
}

export const AUTH_GUARD = 'AUTH_GUARD';
