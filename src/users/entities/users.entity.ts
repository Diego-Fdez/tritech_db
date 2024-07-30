import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { UserInterface } from '../interfaces/users.interface';
import { ROLES } from '../../constants/roles';
import { TemplatesEntity } from '../../templates/entities/templates.entity';
import { FormEntity } from '../../form/entities/form.entity';
import { ResponsesEntity } from '../../responses/entities/responses.entity';

// database table
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements UserInterface {
  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: 'BASIC' })
  role: ROLES;

  @Column()
  country: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TemplatesEntity, (templates) => templates.user)
  templates: TemplatesEntity[];

  @OneToMany(() => FormEntity, (form) => form.createdBy)
  forms: FormEntity[];

  @OneToMany(() => ResponsesEntity, (response) => response.user)
  responses: ResponsesEntity[];
}
