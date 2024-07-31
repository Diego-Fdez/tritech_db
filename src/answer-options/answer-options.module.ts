import { Module } from '@nestjs/common';
import { AnswerOptionsService } from './services/answer-options.service';
import { AnswerOptionsController } from './controllers/answer-options.controller';

@Module({
  providers: [AnswerOptionsService],
  controllers: [AnswerOptionsController]
})
export class AnswerOptionsModule {}
