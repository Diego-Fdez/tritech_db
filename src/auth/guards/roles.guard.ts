import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY, ROLES } from '../../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPubic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPubic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser } = req.headers;
    console.log(roleUser);
    if (roles === undefined) {
      if (!admin) return true;
      else if (admin && roleUser === admin) return true;
      else throw new UnauthorizedException(`don't have permission to access`);
    }

    if (roleUser === ROLES.ADMIN) return true;

    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth)
      throw new UnauthorizedException(`don't have permission to access`);

    return true;
  }
}
