import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { TemplatesService } from '../templates/services/templates.service';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService, TemplatesService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
