import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { AnswerInterface } from '../interfaces';
import { QuestionEntity } from '../../question/entities/question.entity';
import { ResponsesEntity } from '../../responses/entities/responses.entity';

@Entity({ name: 'answer' })
export class AnswerEntity extends BaseEntity implements AnswerInterface {
  @Column()
  answerValue: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;

  @ManyToOne(() => ResponsesEntity, (response) => response.answers)
  response: ResponsesEntity;
}
