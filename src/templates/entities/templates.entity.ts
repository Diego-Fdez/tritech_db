import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { TemplatesInterface } from '../interfaces';

@Entity({ name: 'templates' })
export class TemplatesEntity extends BaseEntity implements TemplatesInterface {
  @Column()
  clientId: string;

  @Column()
  templateName: string;

  @Column()
  createdBy: string;
}
