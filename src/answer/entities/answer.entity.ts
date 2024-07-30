import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { AnswerInterface } from '../interfaces';

@Entity()
export class Answer extends BaseEntity implements AnswerInterface {
  @Column()
  answerValue: string;

  // @ManyToOne(() => Form, form => form.answers)
  // form: Form;

  // @ManyToOne(() => Question, question => question.answers)
  // question: Question;
}
