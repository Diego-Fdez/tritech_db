import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';
import { ResponsesEntity } from './entities/responses.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ResponsesEntity])],
  providers: [ResponsesService],
  controllers: [ResponsesController],
  exports: [ResponsesService, TypeOrmModule],
})
export class ResponsesModule {}
