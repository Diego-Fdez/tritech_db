import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { SugarCaneMillsInterface } from '../interfaces';

@Entity({ name: 'sugarCaneMills' })
export class SugarCaneMillsEntity
  extends BaseEntity
  implements SugarCaneMillsInterface
{
  @Column()
  tandemCount: number;

  @Column()
  millName: string;

  @Column()
  templateId: string;
}
