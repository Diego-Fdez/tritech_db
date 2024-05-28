import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { TemplatesInterface } from '../interfaces';
import { UsersEntity } from '../../users/entities/users.entity';
import { ClientsEntity } from '../../clients/entities/clients.entity';
import { SugarCaneMillsEntity } from '../../suggar-cane-mills/entities/sugarCaneMills.entity';

@Entity({ name: 'templates' })
export class TemplatesEntity extends BaseEntity implements TemplatesInterface {
  @Column()
  clientId: string;

  @Column({ unique: true })
  templateName: string;

  @Column()
  createdBy: string;

  @ManyToOne(() => UsersEntity, (user) => user.templates)
  @JoinColumn({ name: 'created_by' })
  user: UsersEntity;

  @ManyToOne(() => ClientsEntity, (client) => client.template)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity;

  @OneToMany(
    () => SugarCaneMillsEntity,
    (sugarCaneMill) => sugarCaneMill.template,
  )
  sugarCaneMills: SugarCaneMillsEntity[];
}
