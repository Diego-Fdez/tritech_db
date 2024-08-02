import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './services/answer.service';
import { AnswerController } from './controllers/answer.controller';
import { AnswerEntity } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  providers: [AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService, TypeOrmModule],
})
export class AnswerModule {}
