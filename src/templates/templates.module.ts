import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './services/templates.service';
import { TemplatesController } from './controllers/templates.controller';
import { TemplatesEntity } from './entities/templates.entity';
import { UsersService } from '../users/services/users.service';
import { ClientsService } from '../clients/services/clients.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TemplatesEntity])],
  providers: [TemplatesService, UsersService, ClientsService],
  controllers: [TemplatesController],
  exports: [TemplatesService, TypeOrmModule],
})
export class TemplatesModule {}
