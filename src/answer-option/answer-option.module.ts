import { Module } from '@nestjs/common';
import { AnswerOptionService } from './services/answer-option.service';
import { AnswerOptionController } from './controllers/answer-option.controller';

@Module({
  providers: [AnswerOptionService],
  controllers: [AnswerOptionController]
})
export class AnswerOptionModule {}
