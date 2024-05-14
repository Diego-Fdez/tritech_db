import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  public async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(email, password);

    //if user not found
    if (!userValidate) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwt = await this.authService.generateJWT(userValidate?.data);

    return jwt;
  }
}
