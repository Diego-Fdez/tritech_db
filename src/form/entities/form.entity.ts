import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ClientsEntity } from '../../clients/entities/clients.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { BaseEntity } from '../../config/base.entity';
import { FormInterface } from '../interfaces';
import { QuestionEntity } from '../../question/entities/question.entity';
import { ResponsesEntity } from '../../responses/entities/responses.entity';
import { FormStatus } from '../dto';

@Entity({ name: 'form' })
export class FormEntity extends BaseEntity implements FormInterface {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  clientId: string;

  @Column()
  createdById: string;

  @Column({ type: 'enum', enum: FormStatus, default: FormStatus.ACTIVE })
  status: FormStatus;

  @ManyToOne(() => ClientsEntity, (client) => client.forms)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.forms)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: UsersEntity;

  @OneToMany(() => QuestionEntity, (question) => question.form)
  questions: QuestionEntity[];

  @OneToMany(() => ResponsesEntity, (response) => response.form)
  responses: ResponsesEntity[];
}
