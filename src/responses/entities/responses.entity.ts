import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { FormEntity } from '../../form/entities/form.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';

@Entity({ name: 'responses' })
export class ResponsesEntity extends BaseEntity {
  @ManyToOne(() => FormEntity, (form) => form.responses)
  form: FormEntity;

  @ManyToOne(() => UsersEntity, (user) => user.responses)
  user: UsersEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.response)
  answers: AnswerEntity[];
}
