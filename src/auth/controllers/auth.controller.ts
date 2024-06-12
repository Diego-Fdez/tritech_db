import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  public async login(
    @Body() { email, password }: AuthDTO,
    @Response() res: Res,
  ) {
    try {
      const userValidate = await this.authService.validateUser(email, password);

      //if user not found
      if (!userValidate) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const jwt = await this.authService.generateJWT(userValidate?.data);

      res.send(jwt);
    } catch (error) {
      res.status(error?.status || 500).send({
        statusCode: error?.status || 500,
        status: 'FAILED',
        errorMessage: error?.message || error,
      });
    }
  }
}
