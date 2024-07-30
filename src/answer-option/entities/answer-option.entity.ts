import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { AnswerOptionInterface } from '../interfaces';

@Entity()
export class AnswerOption extends BaseEntity implements AnswerOptionInterface {
  @Column()
  textAnswer: string;

  // @ManyToOne(() => Question, question => question.answerOptions)
  // question: Question;
}
