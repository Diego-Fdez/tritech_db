import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MillComponentsService } from './services/mill-components.service';
import { MillComponentsController } from './controllers/mill-components.controller';
import { MillComponentsEntity } from './entities/millComponents.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MillComponentsEntity])],
  providers: [MillComponentsService],
  controllers: [MillComponentsController],
  exports: [MillComponentsService],
})
export class MillComponentsModule {}
