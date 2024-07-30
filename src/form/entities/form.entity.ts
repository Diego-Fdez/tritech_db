import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ClientsEntity } from '../../clients/entities/clients.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { BaseEntity } from '../../config/base.entity';
import { FormInterface } from '../interfaces';
import { QuestionEntity } from '../../question/entities/question.entity';
import { ResponsesEntity } from '../../responses/entities/responses.entity';

@Entity({ name: 'form' })
export class FormEntity extends BaseEntity implements FormInterface {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => ClientsEntity, (client) => client.forms)
  client: ClientsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.forms)
  createdBy: UsersEntity;

  @OneToMany(() => QuestionEntity, (question) => question.form)
  questions: QuestionEntity[];

  @OneToMany(() => ResponsesEntity, (response) => response.form)
  responses: ResponsesEntity[];
}
