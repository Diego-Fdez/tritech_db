import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { FormEntity } from '../../form/entities/form.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';
import { ResponsesInterface } from '../interfaces';

@Entity({ name: 'responses' })
export class ResponsesEntity extends BaseEntity implements ResponsesInterface {
  @Column()
  formId: string;

  @Column()
  userId: string;

  @ManyToOne(() => FormEntity, (form) => form.responses)
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  @ManyToOne(() => UsersEntity, (user) => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.response)
  answers: AnswerEntity[];
}
