import { Column, Entity } from 'typeorm';
import { TemperatureDataInterface } from '../interfaces';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'temperatureData' })
export class TemperatureDataEntity
  extends BaseEntity
  implements TemperatureDataInterface
{
  @Column()
  millComponentId: string;

  @Column()
  temperature: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  details: string;
}
