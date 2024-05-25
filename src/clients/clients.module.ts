import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { ClientsEntity } from './entities/clients.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity])],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
