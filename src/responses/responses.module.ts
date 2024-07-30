import { Module } from '@nestjs/common';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';

@Module({
  providers: [ResponsesService],
  controllers: [ResponsesController]
})
export class ResponsesModule {}
