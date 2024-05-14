import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
