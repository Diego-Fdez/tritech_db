import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ClientsCreateInterface } from '../interfaces';
import { TemplatesEntity } from '../../templates/entities/templates.entity';

@Entity({ name: 'clients' })
export class ClientsEntity
  extends BaseEntity
  implements ClientsCreateInterface
{
  @Column({ unique: true })
  clientName: string;

  @Column()
  country: string;

  @OneToMany(() => TemplatesEntity, (template) => template.client)
  template: TemplatesEntity;
}
