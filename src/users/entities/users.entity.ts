import { BaseEntity } from '../../config/base.entity';
import { Column, Entity } from 'typeorm';
import { UserInterface } from '../interfaces/users.interface';
import { ROLES } from '../../constants/roles';
import { Exclude } from 'class-transformer';

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

  @Column()
  web: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @Column()
  phone: string;

  @Column()
  country: string;
}
