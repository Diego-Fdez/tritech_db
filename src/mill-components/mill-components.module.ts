import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MillComponentsService } from './services/mill-components.service';
import { MillComponentsController } from './controllers/mill-components.controller';
import { MillComponentsEntity } from './entities/millComponents.entity';
import { SugarCaneMillsService } from '../suggar-cane-mills/services/sugar-cane-mills.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MillComponentsEntity])],
  providers: [MillComponentsService, SugarCaneMillsService],
  controllers: [MillComponentsController],
  exports: [MillComponentsService],
})
export class MillComponentsModule {}
