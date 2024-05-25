import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import {
  MillComponentsInterface,
  MillComponentsName,
  MillComponentsType,
} from '../interfaces';
import { SugarCaneMillsEntity } from '../../suggar-cane-mills/entities/sugarCaneMills.entity';
import { TemperatureDataEntity } from '../../temperature-data/entities/temperatureData.entity';

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

  @OneToOne(
    () => SugarCaneMillsEntity,
    (sugarCaneMill) => sugarCaneMill.millComponents,
  )
  @JoinColumn({ name: 'sugar_cane_mill_id' })
  sugarCaneMill: SugarCaneMillsEntity;

  @OneToOne(
    () => TemperatureDataEntity,
    (temperatureData) => temperatureData.millComponent,
  )
  temperatureData: TemperatureDataEntity;
}
