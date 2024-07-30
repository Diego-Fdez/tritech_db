import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
