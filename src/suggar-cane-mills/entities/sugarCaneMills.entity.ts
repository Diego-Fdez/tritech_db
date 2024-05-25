import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { SugarCaneMillsInterface } from '../interfaces';
import { TemplatesEntity } from '../../templates/entities/templates.entity';
import { MillComponentsEntity } from '../../mill-components/entities/millComponents.entity';

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

  @OneToOne(() => TemplatesEntity, (template) => template.sugarCaneMills)
  @JoinColumn({ name: 'template_id' })
  template: TemplatesEntity;

  @ManyToOne(
    () => MillComponentsEntity,
    (millComponent) => millComponent.sugarCaneMill,
  )
  millComponents: MillComponentsEntity[];
}
