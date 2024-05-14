import { ROLES } from '../../constants';

export interface PayloadTokenInterface {
  role: ROLES;
  sub: string;
}

export interface AuthBodyInterface {
  email: string;
  password: string;
}

export interface AuthTokenResultInterface {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface AuthTokenInterface {
  role: string;
  sub: string;
  isExpired: boolean;
}
