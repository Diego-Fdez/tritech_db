import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { QuestionEntity } from '../../question/entities/question.entity';
import { AnswerOptionsInterface } from '../interfaces';

@Entity({ name: 'answerOptions' })
export class AnswerOptionsEntity
  extends BaseEntity
  implements AnswerOptionsInterface
{
  @Column()
  optionText: string;

  @Column()
  questionId: string;

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
