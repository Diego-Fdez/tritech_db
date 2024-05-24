import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MillComponentsService } from './services/mill-components.service';
import { MillComponentsController } from './controllers/mill-components.controller';
import { MillComponentsEntity } from './entities/millComponents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MillComponentsEntity])],
  providers: [MillComponentsService],
  controllers: [MillComponentsController],
})
export class MillComponentsModule {}
