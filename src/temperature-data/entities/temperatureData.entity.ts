import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { TemperatureDataInterface } from '../interfaces';
import { BaseEntity } from '../../config/base.entity';
import { MillComponentsEntity } from '../../mill-components/entities/millComponents.entity';

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

  @OneToOne(
    () => MillComponentsEntity,
    (millComponent) => millComponent.temperatureData,
  )
  @JoinColumn({ name: 'mill_component_id' })
  millComponent: MillComponentsEntity;
}
