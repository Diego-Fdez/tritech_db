import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserInterface } from '../interfaces/users.interface';
import { ROLES } from '../../constants/roles';
import { Exclude } from 'class-transformer';
import { TemplatesEntity } from '../../templates/entities/templates.entity';

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
}
