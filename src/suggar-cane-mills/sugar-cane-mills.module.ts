import { Module } from '@nestjs/common';
import { SugarCaneMillsService } from './services/sugar-cane-mills.service';
import { SugarCaneMillsController } from './controllers/sugar-cane-mills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SugarCaneMillsEntity } from './entities/sugarCaneMills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SugarCaneMillsEntity])],
  providers: [SugarCaneMillsService],
  controllers: [SugarCaneMillsController],
  exports: [SugarCaneMillsService, TypeOrmModule],
})
export class SugarCaneMillsModule {}
