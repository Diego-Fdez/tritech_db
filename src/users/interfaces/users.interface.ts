import { ROLES } from '../../constants/roles';

export interface UserInterface {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  country: string;
  role: ROLES;
  web?: string;
  createdAt: Date;
  updatedAt: Date;
}
