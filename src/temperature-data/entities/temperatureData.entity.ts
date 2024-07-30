import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @Column({ type: 'uuid' })
  temperatureId: string;

  @ManyToOne(
    () => MillComponentsEntity,
    (millComponent) => millComponent.temperatureData,
  )
  @JoinColumn({ name: 'mill_component_id' })
  millComponent: MillComponentsEntity;
}
