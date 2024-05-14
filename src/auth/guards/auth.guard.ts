import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from '../../constants';
import { UsersService } from '../../users/services/users.service';
import { useToken } from '../../utils';
import { AuthTokenInterface } from '../interfaces';

@Injectable()

/* The AuthGuard class is a TypeScript implementation of the CanActivate interface that checks for a
valid token and user authentication before allowing access to a protected route. */
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    /* checking if the route is marked as public using the `PUBLIC_KEY` */
    if (isPublic) return true;

    /* The `req` variable is then used to access the
    headers of the request object to retrieve the token. */
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['bearer'];

    /* checking if the `token` variable is falsy or an array. */
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    /*  is calling the `useToken` function*/
    const manageToken: AuthTokenInterface | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const { sub } = manageToken;

    const user = await this.userService.getUserById(sub);

    if (!user.data?.id) {
      throw new UnauthorizedException('Invalid user');
    }

    /* These properties can then be accessed in subsequent middleware or route handlers to perform further actions 
    based on the user's identity and role. */
    req.headers.idUser = user?.data?.id;
    req.headers.roleUser = user?.data?.role;
    return true;
  }
}
