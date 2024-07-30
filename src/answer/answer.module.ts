import { Module } from '@nestjs/common';
import { AnswerService } from './services/answer.service';
import { AnswerController } from './controllers/answer.controller';

@Module({
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
