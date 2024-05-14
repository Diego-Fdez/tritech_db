import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthBodyInterface } from '../interfaces';

export class AuthDTO implements AuthBodyInterface {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  password: string;
}
