import * as jwt from 'jsonwebtoken';
import {
  AuthTokenResultInterface,
  AuthTokenInterface,
} from '../auth/interfaces';

export const useToken = (token: string): AuthTokenInterface | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResultInterface;

    // Check if token is expired
    const currentDate = new Date();
    const expiredDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiredDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
