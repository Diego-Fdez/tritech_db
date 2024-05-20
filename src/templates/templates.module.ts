import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './services/templates.service';
import { TemplatesController } from './controllers/templates.controller';
import { TemplatesEntity } from './entities/templates.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TemplatesEntity])],
  providers: [TemplatesService],
  controllers: [TemplatesController],
  exports: [TemplatesService, TypeOrmModule],
})
export class TemplatesModule {}
