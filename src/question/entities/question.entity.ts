import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { QuestionInterface, QuestionStatus } from '../interfaces';
import { FormEntity } from '../../form/entities/form.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';
import { AnswerOptionsEntity } from '../../answer-options/entities/answer-options.entity';

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

  @Column({
    type: 'enum',
    enum: QuestionStatus,
    default: QuestionStatus.ACTIVE,
  })
  status: QuestionStatus;

  @ManyToOne(() => FormEntity, (form) => form.questions)
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @OneToMany(() => AnswerOptionsEntity, (option) => option.question, {
    cascade: true,
  })
  options: AnswerOptionsEntity[];
}
