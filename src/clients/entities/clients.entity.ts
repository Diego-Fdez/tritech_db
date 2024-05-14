import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ClientsCreateInterface } from '../interfaces';

@Entity({ name: 'clients' })
export class ClientsEntity
  extends BaseEntity
  implements ClientsCreateInterface
{
  @Column({ unique: true })
  clientName: string;

  @Column()
  country: string;
}
