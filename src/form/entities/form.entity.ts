import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ClientsEntity } from 'src/clients/entities/clients.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { BaseEntity } from 'src/config/base.entity';
import { FormInterface } from '../interfaces';

@Entity()
export class Form extends BaseEntity implements FormInterface {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'draft' })
  status: string;

  // @ManyToOne(() => ClientsEntity, client => client.forms)
  // client: Client;

  // @ManyToOne(() => UsersEntity, user => user.createdForms)
  // createdBy: User;

  // @OneToMany(() => Question, question => question.form)
  // questions: Question[];
}
