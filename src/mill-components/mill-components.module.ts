import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MillComponentsService } from './services/mill-components.service';
import { MillComponentsController } from './controllers/mill-components.controller';
import { MillComponentsEntity } from './entities/millComponents.entity';
import { TemplatesService } from '../templates/services/templates.service';
import { MillComponentsSubscriber } from './subscribers/millComponents.subscriber';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MillComponentsEntity])],
  providers: [
    MillComponentsService,
    TemplatesService,
    MillComponentsSubscriber,
  ],
  controllers: [MillComponentsController],
  exports: [MillComponentsService, TypeOrmModule],
})
export class MillComponentsModule {}
