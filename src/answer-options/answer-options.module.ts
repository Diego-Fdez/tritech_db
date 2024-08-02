import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOptionsService } from './services/answer-options.service';
import { AnswerOptionsController } from './controllers/answer-options.controller';
import { AnswerOptionsEntity } from './entities/answer-options.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerOptionsEntity])],
  providers: [AnswerOptionsService],
  controllers: [AnswerOptionsController],
  exports: [AnswerOptionsService, TypeOrmModule],
})
export class AnswerOptionsModule {}
