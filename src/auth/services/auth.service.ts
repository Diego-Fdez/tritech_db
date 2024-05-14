import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from '../../users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';
import { PayloadTokenInterface } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  // validate user
  public async validateUser(email: string, password: string) {
    // find user in db
    const userByEmail = await this.userService.getUserByEmail(email);

    // compare passwords
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail?.data?.password);

      // if match return user
      if (match) return userByEmail;
    }

    return null;
  }

  // sign jwt token
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UsersEntity): Promise<any> {
    const getUser = await this.userService.getUserById(user.id);
    const payload: PayloadTokenInterface = {
      role: getUser?.data?.role,
      sub: getUser?.data?.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '24h',
      }),
      user,
    };
  }
}
