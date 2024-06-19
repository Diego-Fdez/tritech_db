import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import {
  MillComponentsInterface,
  MillComponentsName,
  MillName,
} from '../interfaces';
import { TemperatureDataEntity } from '../../temperature-data/entities/temperatureData.entity';
import { TemplatesEntity } from '../../templates/entities/templates.entity';

@Entity({ name: 'millComponents' })
export class MillComponentsEntity
  extends BaseEntity
  implements MillComponentsInterface
{
  @Column()
  templateId: string;

  @Column({ type: 'enum', enum: MillName })
  millName: MillName;

  @Column({ type: 'enum', enum: MillComponentsName })
  componentName: MillComponentsName;

  @Column()
  tandemNumber: number;

  @ManyToOne(() => TemplatesEntity, (template) => template.millComponents)
  @JoinColumn({ name: 'template_id' })
  template: TemplatesEntity;

  @OneToMany(
    () => TemperatureDataEntity,
    (temperatureData) => temperatureData.millComponent,
  )
  temperatureData: TemperatureDataEntity[];
}
