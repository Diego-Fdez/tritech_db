import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @Column()
  formId: string;

  @ManyToOne(() => FormEntity, (form) => form.questions)
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}
