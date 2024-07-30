import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { QuestionInterface } from '../interfaces';

@Entity()
export class Question extends BaseEntity implements QuestionInterface {
  @Column()
  type: string;

  @Column()
  text: string;

  @Column()
  order: number;

  // @ManyToOne(() => Form, form => form.questions)
  // form: Form;

  // @OneToMany(() => AnswerOption, answerOption => answerOption.question)
  // answerOptions: AnswerOption[];
}
