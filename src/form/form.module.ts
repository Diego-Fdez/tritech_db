import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormService } from './services/form.service';
import { FormController } from './controllers/form.controller';
import { FormEntity } from './entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  providers: [FormService],
  controllers: [FormController],
  exports: [FormService, TypeOrmModule],
})
export class FormModule {}
