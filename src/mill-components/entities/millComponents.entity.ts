import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import {
  MillComponentsInterface,
  MillComponentsName,
  MillComponentsType,
} from '../interfaces';

@Entity({ name: 'millComponents' })
export class MillComponentsEntity
  extends BaseEntity
  implements MillComponentsInterface
{
  @Column()
  sugarCaneMillId: string;

  @Column({ type: 'enum', enum: MillComponentsType })
  componentType: MillComponentsType;

  @Column({ type: 'enum', enum: MillComponentsName })
  componentName: MillComponentsName;
}
