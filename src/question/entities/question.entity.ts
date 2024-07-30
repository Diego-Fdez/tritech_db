import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { QuestionInterface } from '../interfaces';
import { FormEntity } from '../../form/entities/form.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';

@Entity({ name: 'question' })
export class QuestionEntity extends BaseEntity implements QuestionInterface {
  @Column()
  typeQuestion: string;

  @Column()
  textQuestion: string;

  @Column()
  order: number;

  @ManyToOne(() => FormEntity, (form) => form.questions)
  form: FormEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}
